const calculateMatch = async (user1, user2) => {
    // 1. Embedding des compétences (ex: via API OpenAI)
    const embeddingUser1 = await getEmbedding(user1.skills);
    const embeddingUser2 = await getEmbedding(user2.skills);

    // 2. Similarité cosinus
    const score = cosineSimilarity(embeddingUser1, embeddingUser2);
    return score * 100; // Score en %
};