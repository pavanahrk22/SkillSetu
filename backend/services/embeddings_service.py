class EmbeddingsService:
    def __init__(self):
        pass
        
    def embed_text(self, text: str) -> list[float]:
        return [0.0] * 128
        
    def find_similar(self, query_embedding: list[float], items: list[list[float]], top_k: int = 5) -> list[tuple[int, float]]:
        # Mock implementation returning index and score 1.0 for first top_k
        results = []
        for i in range(min(top_k, len(items))):
            results.append((i, 1.0))
        return results
