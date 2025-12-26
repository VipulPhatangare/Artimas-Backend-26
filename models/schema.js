const mongoose = require('mongoose');

const studentInfoSchema = new mongoose.Schema({
    email: String,
    firstName: String,
    lastName: String,
    phoneNumber: Number,
    collegeName: String,
    createdAt: { type: Date, default: Date.now }
});

const hackMatrixSchema = new mongoose.Schema({
    teamId: String,
    teamName: String,
    participantCount: { type: Number, default: 3 },
    // Leader details
    leaderEmail: String,
    leaderName: String,
    leaderPhone: String,
    leaderCollege: String,
    leaderYear: String,
    leaderBranch: String,
    // Member 2 details
    member2Email: String,
    member2Name: String,
    member2Phone: String,
    member2College: String,
    member2Year: String,
    member2Branch: String,
    // Member 3 details
    member3Email: String,
    member3Name: String,
    member3Phone: String,
    member3College: String,
    member3Year: String,
    member3Branch: String,
    // Member 4 details (optional)
    member4Email: String,
    member4Name: String,
    member4Phone: String,
    member4College: String,
    member4Year: String,
    member4Branch: String,
    isPccoe: Boolean,
    screenshot: Buffer,
    createdAt: { type: Date, default: Date.now }
});

const datathonSchema = new mongoose.Schema({
    teamId: String,
    teamName: String,
    participantCount: { type: Number, default: 1 },
    // Leader details
    leaderEmail: String,
    leaderName: String,
    leaderPhone: String,
    leaderCollege: String,
    leaderYear: String,
    // Member details (optional for 2-member teams)
    member1Email: String,
    memberName: String,
    memberPhone: String,
    memberCollege: String,
    memberYear: String,
    isPccoe: Boolean,
    screenshot: Buffer,
    createdAt: { type: Date, default: Date.now }
});

const amongUsSchema = new mongoose.Schema({     
    leaderEmail: String,
    leaderName: String,
    leaderPhone: String,
    leaderCollege: String,
    leaderYear: String,
    leaderBranch: String,
    isPccoe: Boolean,
    screenshot: Buffer,
    createdAt: { type: Date, default: Date.now }
});

const houdiniHeistSchema = new mongoose.Schema({
    teamId: String,
    teamName: String,
    participantCount: { type: Number, default: 2 },
    // Leader details
    leaderEmail: String,
    leaderName: String,
    leaderPhone: String,
    leaderCollege: String,
    leaderYear: String,
    // Member 1 details
    member1Email: String,
    member1Name: String,
    member1Phone: String,
    member1College: String,
    member1Year: String,
    // Member 2 details (optional)
    member2Email: String,
    member2Name: String,
    member2Phone: String,
    member2College: String,
    member2Year: String,
    isPccoe: Boolean,
    screenshot: Buffer,
    createdAt: { type: Date, default: Date.now }
});

const promptReadySchema = new mongoose.Schema({
    teamId: String,
    teamName: String,
    participantCount: { type: Number, default: 3 },
    // Leader details
    leaderEmail: String,
    leaderName: String,
    leaderPhone: String,
    leaderCollege: String,
    leaderYear: String,
    leaderBranch: String,
    // Member 1 details
    member1Email: String,
    member1Name: String,
    member1Phone: String,
    member1College: String,
    member1Year: String,
    member1Branch: String,
    // Member 2 details
    member2Email: String,
    member2Name: String,
    member2Phone: String,
    member2College: String,
    member2Year: String,
    member2Branch: String,
    isPccoe: Boolean,
    screenshot: Buffer,
    createdAt: { type: Date, default: Date.now }
});

const pixelPerfectSchema = new mongoose.Schema({     
    leaderEmail: String,
    leaderName: String,
    leaderPhone: String,
    leaderCollege: String,
    leaderYear: String,
    leaderBranch: String,
    isPccoe: Boolean,
    screenshot: Buffer,
    createdAt: { type: Date, default: Date.now }
});

const studentInfo = mongoose.model('studentInfo', studentInfoSchema);
const hackMatrix = mongoose.model('hackMatrix', hackMatrixSchema);
const datathon = mongoose.model('datathon', datathonSchema);
const amongUs = mongoose.model('amongUs', amongUsSchema);
const houdiniHeist = mongoose.model('houdiniHeist', houdiniHeistSchema);
const promptReady = mongoose.model('promptReady', promptReadySchema);
const pixelPerfect = mongoose.model('pixelPerfect', pixelPerfectSchema);

module.exports = {
    studentInfo,
    hackMatrix,
    datathon,
    amongUs,
    houdiniHeist,
    promptReady,
    pixelPerfect
}
