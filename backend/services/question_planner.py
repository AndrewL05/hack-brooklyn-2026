"""Generates a question plan for a session.

Behavioral mode: LLM-generated STAR questions (Groq primary, Featherless fallback).
Technical mode: static problem stubs (unchanged).
"""

import json
import logging
import re

from models.interview_session import InterviewMode
from models.question import Question, QuestionType
from services.llm import chat_complete

logger = logging.getLogger(__name__)

TECHNICAL_QUESTIONS = [
    {"prompt": "Given an array of integers, find the indices of the two numbers that sum to a target value.", "problem_id": "two-sum"},
    {"prompt": "Given a string of brackets, determine if the input string is valid (brackets close in correct order).", "problem_id": "valid-parentheses"},
    {"prompt": "Given an integer array, find the contiguous subarray which has the largest sum and return its sum.", "problem_id": "maximum-subarray"},
]

_BEHAVIORAL_QUESTION_PROMPT = """\
Generate exactly {n} distinct behavioral interview questions for a software engineering candidate.

Requirements:
- Each question must be in STAR style — asking the candidate to describe a specific past experience
- Cover DIFFERENT topics — pick from this pool without repeating: leadership and ownership, conflict resolution, failure and learning, teamwork and collaboration, working under time pressure, navigating ambiguity, taking initiative, receiving and acting on feedback, cross-functional communication, delivering measurable impact
- Do NOT use overused openers like "Tell me about yourself" or "What is your greatest weakness"
- Make questions specific, probing, and varied in length and complexity
- Each question should be a single sentence ending with a period or question mark

Return ONLY valid JSON with this exact structure (no markdown code fences, no explanation):
{{"questions": ["question 1", "question 2", ...]}}

Generate {n} questions now."""


def _question_count(duration_minutes: int) -> int:
    if duration_minutes <= 20:
        return 2
    if duration_minutes <= 30:
        return 3
    if duration_minutes <= 45:
        return 5
    return 6


def _parse_questions_json(raw: str, expected: int) -> list[str]:
    cleaned = re.sub(r"```(?:json)?|```", "", raw).strip()
    try:
        data = json.loads(cleaned)
    except json.JSONDecodeError as exc:
        raise ValueError(f"LLM returned non-JSON: {raw[:200]}") from exc
    questions = data.get("questions", [])
    if not isinstance(questions, list) or not questions:
        raise ValueError(f"LLM returned invalid structure: {raw[:200]}")
    return [str(q) for q in questions[:expected]]


async def plan_behavioral_questions(session_id: str, duration_minutes: int) -> list[Question]:
    """Generate N STAR behavioral questions via LLM. Raises on failure."""
    n = _question_count(duration_minutes)
    prompt = _BEHAVIORAL_QUESTION_PROMPT.format(n=n)
    raw = await chat_complete(prompt, temperature=0.8)
    question_texts = _parse_questions_json(raw, n)
    return [
        Question(
            session_id=session_id,
            order=i,
            type=QuestionType.behavioral,
            prompt=text,
            follow_up_tree=[],
        )
        for i, text in enumerate(question_texts)
    ]


def plan_questions(session_id: str, mode: InterviewMode, role: str) -> list[Question]:
    """Synchronous question planner for technical/mixed sessions (unchanged)."""
    questions: list[Question] = []
    if mode in (InterviewMode.technical, InterviewMode.mixed):
        for i, q in enumerate(TECHNICAL_QUESTIONS[:1]):
            questions.append(Question(
                session_id=session_id,
                order=i,
                type=QuestionType.technical,
                prompt=q["prompt"],
                follow_up_tree=[],
                coding_problem_id=q["problem_id"],
            ))
    return questions
