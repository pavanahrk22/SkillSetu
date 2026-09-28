from config import get_settings

class LLMService:
    def __init__(self, provider: str = None):
        self.provider = provider if provider is not None else get_settings().LLM_PROVIDER
        
    async def generate_mcqs(self, text: str, num_questions: int) -> list[dict]:
        return [{"question_text": "Mock?", "option_a": "A", "option_b": "B", "option_c": "C", "option_d": "D", "correct_option": "A", "explanation": "Expl", "difficulty": "medium"}]
        
    async def generate_gap_explanation(self, gap_data: dict) -> str:
        return "Mock gap explanation."
        
    async def generate_feedback(self, performance_data: dict) -> str:
        return "Mock feedback."
        
    async def generate_mcqs_from_content(self, content: str, num_questions: int = 5) -> list[dict]:
        """Call Claude API to generate MCQs. Falls back to mock if no API key."""
        
        system_prompt = """You are an expert quiz generator. Given the following text content, generate exactly {n} multiple-choice questions. 

Return ONLY valid JSON — no markdown, no explanation, no preamble. The JSON must be a list of objects with this exact structure:
[
  {{
    "question": "The question text",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correct_answer_index": 0,
    "explanation": "Brief explanation of why this is correct"
  }}
]""".format(n=num_questions)

        if self.provider == "anthropic":
            try:
                import anthropic
                import json
                settings = get_settings()
                client = anthropic.Anthropic(api_key=settings.ANTHROPIC_API_KEY)
                response = client.messages.create(
                    model=settings.ANTHROPIC_MODEL,
                    max_tokens=4096,
                    system=system_prompt,
                    messages=[{"role": "user", "content": f"Generate {num_questions} MCQs from this content:\n\n{content}"}]
                )
                
                text = response.content[0].text.strip()
                if text.startswith("```json"):
                    text = text[7:]
                elif text.startswith("```"):
                    text = text[3:]
                if text.endswith("```"):
                    text = text[:-3]
                text = text.strip()
                
                parsed = json.loads(text)
                if not isinstance(parsed, list):
                    raise ValueError("JSON is not a list")
                for item in parsed:
                    if "question" not in item:
                        raise ValueError("Missing 'question'")
                    if "options" not in item or not isinstance(item["options"], list) or len(item["options"]) != 4:
                        raise ValueError("Invalid 'options'")
                    if "correct_answer_index" not in item or not isinstance(item["correct_answer_index"], int) or not (0 <= item["correct_answer_index"] <= 3):
                        raise ValueError("Invalid 'correct_answer_index'")
                
                return parsed
            except Exception as e:
                print(f"WARNING: Claude API error or validation failure: {e}. Falling back to mock MCQs.")
        
        # Mock fallback
        return self._mock_mcqs(content, num_questions)

    def _mock_mcqs(self, content: str, n: int) -> list[dict]:
        words = content.split()[:200]
        mcqs = []
        for i in range(n):
            mcqs.append({
                "question": f"Based on the provided material, which of the following statements about {' '.join(words[i*5:(i+1)*5])} is most accurate?",
                "options": [
                    f"It relates to governance and public administration",
                    f"It is primarily concerned with financial management",
                    f"It involves technical statistical methodology",
                    f"It pertains to digital transformation initiatives"
                ],
                "correct_answer_index": i % 4,
                "explanation": f"This is derived from the source material discussing {' '.join(words[i*3:(i+1)*3])}."
            })
        return mcqs
