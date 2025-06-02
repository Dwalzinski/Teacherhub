const { RtcTokenBuilder, RtcRole } = require('agora-token');

function generateRtcToken(appId, appCertificate, channelName, uid, role, expirationTimeInSeconds) {
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;
  return RtcTokenBuilder.buildTokenWithUid(appId, appCertificate, channelName, uid, role, privilegeExpiredTs);
}

module.exports = { generateRtcToken };