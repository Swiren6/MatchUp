const matchs = new Map(); // { userId: [targetId, ...] }

function checkForMatch(userId, targetId) {
  const targetLikes = matchs.get(targetId) || [];

  if (targetLikes.includes(userId)) {
    addMatch(userId, targetId);
    return true;
  }

  addLike(userId, targetId);
  return false;
}

function addLike(userId, targetId) {
  if (!matchs.has(userId)) {
    matchs.set(userId, []);
  }

  const likes = matchs.get(userId);
  if (!likes.includes(targetId)) {
    likes.push(targetId);
  }
}

function addMatch(userId, targetId) {
  console.log(`💘 Match entre ${userId} et ${targetId}`);
}

function notifyUsers(userId, targetId) {
  console.log(`🔔 Notification envoyée à ${userId} et ${targetId}`);
}

module.exports = {
  checkForMatch,
  notifyUsers
};
