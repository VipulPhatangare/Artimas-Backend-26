const mongoose = require('mongoose');
const { connectDB } = require('./database/db');
const {
    studentInfo,
    hackMatrix,
    datathon,
    amongUs,
    houdiniHeist,
    promptReady,
    pixelPerfect
} = require('./models/schema');

// Dummy student data
const students = [
    {
        email: 'john.doe@student.pccoe.edu',
        firstName: 'John',
        lastName: 'Doe',
        phoneNumber: 9876543210,
        year: 'TE',
        collegeName: 'PCCOE'
    },
    {
        email: 'jane.smith@student.pccoe.edu',
        firstName: 'Jane',
        lastName: 'Smith',
        phoneNumber: 9876543211,
        year: 'BE',
        collegeName: 'PCCOE'
    },
    {
        email: 'alex.kumar@gmail.com',
        firstName: 'Alex',
        lastName: 'Kumar',
        phoneNumber: 9876543212,
        year: 'TE',
        collegeName: 'MIT College'
    },
    {
        email: 'priya.patel@gmail.com',
        firstName: 'Priya',
        lastName: 'Patel',
        phoneNumber: 9876543213,
        year: 'BE',
        collegeName: 'VIT College'
    },
    {
        email: 'rahul.sharma@student.pccoe.edu',
        firstName: 'Rahul',
        lastName: 'Sharma',
        phoneNumber: 9876543214,
        year: 'SE',
        collegeName: 'PCCOE'
    },
    {
        email: 'sneha.desai@gmail.com',
        firstName: 'Sneha',
        lastName: 'Desai',
        phoneNumber: 9876543215,
        year: 'TE',
        collegeName: 'COEP'
    },
    {
        email: 'amit.verma@gmail.com',
        firstName: 'Amit',
        lastName: 'Verma',
        phoneNumber: 9876543216,
        year: 'BE',
        collegeName: 'Symbiosis'
    },
    {
        email: 'neha.joshi@student.pccoe.edu',
        firstName: 'Neha',
        lastName: 'Joshi',
        phoneNumber: 9876543217,
        year: 'TE',
        collegeName: 'PCCOE'
    },
    {
        email: 'vikram.singh@student.pccoe.edu',
        firstName: 'Vikram',
        lastName: 'Singh',
        phoneNumber: 9876543218,
        year: 'BE',
        collegeName: 'PCCOE'
    },
    {
        email: 'pooja.mehta@gmail.com',
        firstName: 'Pooja',
        lastName: 'Mehta',
        phoneNumber: 9876543219,
        year: 'TE',
        collegeName: 'COEP'
    },
    {
        email: 'rohan.reddy@gmail.com',
        firstName: 'Rohan',
        lastName: 'Reddy',
        phoneNumber: 9876543220,
        year: 'SE',
        collegeName: 'VIT College'
    },
    {
        email: 'anjali.nair@student.pccoe.edu',
        firstName: 'Anjali',
        lastName: 'Nair',
        phoneNumber: 9876543221,
        year: 'BE',
        collegeName: 'PCCOE'
    },
    {
        email: 'karthik.raj@gmail.com',
        firstName: 'Karthik',
        lastName: 'Raj',
        phoneNumber: 9876543222,
        year: 'TE',
        collegeName: 'MIT College'
    },
    {
        email: 'divya.iyer@gmail.com',
        firstName: 'Divya',
        lastName: 'Iyer',
        phoneNumber: 9876543223,
        year: 'SE',
        collegeName: 'Symbiosis'
    },
    {
        email: 'arjun.menon@student.pccoe.edu',
        firstName: 'Arjun',
        lastName: 'Menon',
        phoneNumber: 9876543224,
        year: 'BE',
        collegeName: 'PCCOE'
    },
    {
        email: 'kavya.pillai@gmail.com',
        firstName: 'Kavya',
        lastName: 'Pillai',
        phoneNumber: 9876543225,
        year: 'TE',
        collegeName: 'COEP'
    },
    {
        email: 'siddharth.gupta@gmail.com',
        firstName: 'Siddharth',
        lastName: 'Gupta',
        phoneNumber: 9876543226,
        year: 'SE',
        collegeName: 'MIT College'
    },
    {
        email: 'riya.chopra@student.pccoe.edu',
        firstName: 'Riya',
        lastName: 'Chopra',
        phoneNumber: 9876543227,
        year: 'BE',
        collegeName: 'PCCOE'
    },
    {
        email: 'aditya.malhotra@gmail.com',
        firstName: 'Aditya',
        lastName: 'Malhotra',
        phoneNumber: 9876543228,
        year: 'TE',
        collegeName: 'VIT College'
    },
    {
        email: 'tanvi.agarwal@gmail.com',
        firstName: 'Tanvi',
        lastName: 'Agarwal',
        phoneNumber: 9876543229,
        year: 'SE',
        collegeName: 'Symbiosis'
    }
];

// Dummy HackMatrix team data
const hackMatrixTeams = [
    {
        teamId: 'HM001',
        teamName: 'Code Warriors',
        leaderEmail: 'john.doe@student.pccoe.edu',
        member1Email: 'jane.smith@student.pccoe.edu',
        member2Email: 'alex.kumar@gmail.com',
        member3Email: 'priya.patel@gmail.com',
        isPccoe: true,
        transactionId: 'TXN001HM'
    },
    {
        teamId: 'HM002',
        teamName: 'Tech Titans',
        leaderEmail: 'rahul.sharma@student.pccoe.edu',
        member1Email: 'sneha.desai@gmail.com',
        member2Email: 'amit.verma@gmail.com',
        member3Email: 'neha.joshi@student.pccoe.edu',
        isPccoe: false,
        transactionId: 'TXN002HM'
    },
    {
        teamId: 'HM003',
        teamName: 'Binary Beasts',
        leaderEmail: 'vikram.singh@student.pccoe.edu',
        member1Email: 'pooja.mehta@gmail.com',
        member2Email: 'rohan.reddy@gmail.com',
        member3Email: 'anjali.nair@student.pccoe.edu',
        isPccoe: true,
        transactionId: 'TXN003HM'
    },
    {
        teamId: 'HM004',
        teamName: 'Debug Masters',
        leaderEmail: 'karthik.raj@gmail.com',
        member1Email: 'divya.iyer@gmail.com',
        member2Email: 'arjun.menon@student.pccoe.edu',
        member3Email: 'kavya.pillai@gmail.com',
        isPccoe: false,
        transactionId: 'TXN004HM'
    },
    {
        teamId: 'HM005',
        teamName: 'Syntax Ninjas',
        leaderEmail: 'siddharth.gupta@gmail.com',
        member1Email: 'riya.chopra@student.pccoe.edu',
        member2Email: 'aditya.malhotra@gmail.com',
        member3Email: 'tanvi.agarwal@gmail.com',
        isPccoe: false,
        transactionId: 'TXN005HM'
    },
    {
        teamId: 'HM006',
        teamName: 'Algo Wizards',
        leaderEmail: 'john.doe@student.pccoe.edu',
        member1Email: 'vikram.singh@student.pccoe.edu',
        member2Email: 'sneha.desai@gmail.com',
        member3Email: 'karthik.raj@gmail.com',
        isPccoe: true,
        transactionId: 'TXN006HM'
    },
    {
        teamId: 'HM007',
        teamName: 'Bit Busters',
        leaderEmail: 'jane.smith@student.pccoe.edu',
        member1Email: 'rohan.reddy@gmail.com',
        member2Email: 'divya.iyer@gmail.com',
        member3Email: 'arjun.menon@student.pccoe.edu',
        isPccoe: true,
        transactionId: 'TXN007HM'
    },
    {
        teamId: 'HM008',
        teamName: 'Cyber Squad',
        leaderEmail: 'alex.kumar@gmail.com',
        member1Email: 'pooja.mehta@gmail.com',
        member2Email: 'siddharth.gupta@gmail.com',
        member3Email: 'kavya.pillai@gmail.com',
        isPccoe: false,
        transactionId: 'TXN008HM'
    },
    {
        teamId: 'HM009',
        teamName: 'Logic Legends',
        leaderEmail: 'priya.patel@gmail.com',
        member1Email: 'anjali.nair@student.pccoe.edu',
        member2Email: 'riya.chopra@student.pccoe.edu',
        member3Email: 'aditya.malhotra@gmail.com',
        isPccoe: false,
        transactionId: 'TXN009HM'
    },
    {
        teamId: 'HM010',
        teamName: 'Stack Overflow',
        leaderEmail: 'rahul.sharma@student.pccoe.edu',
        member1Email: 'neha.joshi@student.pccoe.edu',
        member2Email: 'amit.verma@gmail.com',
        member3Email: 'tanvi.agarwal@gmail.com',
        isPccoe: true,
        transactionId: 'TXN010HM'
    }
];

// Dummy Datathon team data
const datathonTeams = [
    {
        teamId: 'DT001',
        teamName: 'Data Miners',
        leaderEmail: 'john.doe@student.pccoe.edu',
        member1Email: 'jane.smith@student.pccoe.edu',
        isPccoe: true,
        transactionId: 'TXN001DT'
    },
    {
        teamId: 'DT002',
        teamName: 'ML Masters',
        leaderEmail: 'priya.patel@gmail.com',
        member1Email: 'alex.kumar@gmail.com',
        isPccoe: false,
        transactionId: 'TXN002DT'
    },
    {
        teamId: 'DT003',
        teamName: 'Data Scientists',
        leaderEmail: 'rahul.sharma@student.pccoe.edu',
        member1Email: 'sneha.desai@gmail.com',
        isPccoe: true,
        transactionId: 'TXN003DT'
    },
    {
        teamId: 'DT004',
        teamName: 'Neural Networks',
        leaderEmail: 'amit.verma@gmail.com',
        member1Email: 'neha.joshi@student.pccoe.edu',
        isPccoe: false,
        transactionId: 'TXN004DT'
    },
    {
        teamId: 'DT005',
        teamName: 'Deep Learners',
        leaderEmail: 'vikram.singh@student.pccoe.edu',
        member1Email: 'pooja.mehta@gmail.com',
        isPccoe: true,
        transactionId: 'TXN005DT'
    },
    {
        teamId: 'DT006',
        teamName: 'AI Architects',
        leaderEmail: 'rohan.reddy@gmail.com',
        member1Email: 'anjali.nair@student.pccoe.edu',
        isPccoe: false,
        transactionId: 'TXN006DT'
    },
    {
        teamId: 'DT007',
        teamName: 'Pattern Finders',
        leaderEmail: 'karthik.raj@gmail.com',
        member1Email: 'divya.iyer@gmail.com',
        isPccoe: false,
        transactionId: 'TXN007DT'
    },
    {
        teamId: 'DT008',
        teamName: 'Data Dragons',
        leaderEmail: 'arjun.menon@student.pccoe.edu',
        member1Email: 'kavya.pillai@gmail.com',
        isPccoe: true,
        transactionId: 'TXN008DT'
    },
    {
        teamId: 'DT009',
        teamName: 'Analytics Aces',
        leaderEmail: 'siddharth.gupta@gmail.com',
        member1Email: 'riya.chopra@student.pccoe.edu',
        isPccoe: false,
        transactionId: 'TXN009DT'
    },
    {
        teamId: 'DT010',
        teamName: 'Stats Squad',
        leaderEmail: 'aditya.malhotra@gmail.com',
        member1Email: 'tanvi.agarwal@gmail.com',
        isPccoe: false,
        transactionId: 'TXN010DT'
    }
];

// Dummy Among Us registrations
const amongUsRegistrations = [
    {
        leaderEmail: 'john.doe@student.pccoe.edu',
        isPccoe: true,
        transactionId: 'TXN001AU'
    },
    {
        leaderEmail: 'rahul.sharma@student.pccoe.edu',
        isPccoe: true,
        transactionId: 'TXN002AU'
    },
    {
        leaderEmail: 'sneha.desai@gmail.com',
        isPccoe: false,
        transactionId: 'TXN003AU'
    },
    {
        leaderEmail: 'jane.smith@student.pccoe.edu',
        isPccoe: true,
        transactionId: 'TXN004AU'
    },
    {
        leaderEmail: 'alex.kumar@gmail.com',
        isPccoe: false,
        transactionId: 'TXN005AU'
    },
    {
        leaderEmail: 'priya.patel@gmail.com',
        isPccoe: false,
        transactionId: 'TXN006AU'
    },
    {
        leaderEmail: 'amit.verma@gmail.com',
        isPccoe: false,
        transactionId: 'TXN007AU'
    },
    {
        leaderEmail: 'neha.joshi@student.pccoe.edu',
        isPccoe: true,
        transactionId: 'TXN008AU'
    },
    {
        leaderEmail: 'vikram.singh@student.pccoe.edu',
        isPccoe: true,
        transactionId: 'TXN009AU'
    },
    {
        leaderEmail: 'pooja.mehta@gmail.com',
        isPccoe: false,
        transactionId: 'TXN010AU'
    }
];

// Dummy Houdini Heist team data
const houdiniHeistTeams = [
    {
        teamId: 'HH001',
        teamName: 'Escape Artists',
        leaderEmail: 'jane.smith@student.pccoe.edu',
        member1Email: 'john.doe@student.pccoe.edu',
        member2Email: 'rahul.sharma@student.pccoe.edu',
        isPccoe: true,
        transactionId: 'TXN001HH'
    },
    {
        teamId: 'HH002',
        teamName: 'Mystery Solvers',
        leaderEmail: 'alex.kumar@gmail.com',
        member1Email: 'priya.patel@gmail.com',
        member2Email: 'amit.verma@gmail.com',
        isPccoe: false,
        transactionId: 'TXN002HH'
    },
    {
        teamId: 'HH003',
        teamName: 'Puzzle Masters',
        leaderEmail: 'sneha.desai@gmail.com',
        member1Email: 'neha.joshi@student.pccoe.edu',
        member2Email: 'vikram.singh@student.pccoe.edu',
        isPccoe: false,
        transactionId: 'TXN003HH'
    },
    {
        teamId: 'HH004',
        teamName: 'Riddle Raiders',
        leaderEmail: 'pooja.mehta@gmail.com',
        member1Email: 'rohan.reddy@gmail.com',
        member2Email: 'anjali.nair@student.pccoe.edu',
        isPccoe: false,
        transactionId: 'TXN004HH'
    },
    {
        teamId: 'HH005',
        teamName: 'Clue Chasers',
        leaderEmail: 'karthik.raj@gmail.com',
        member1Email: 'divya.iyer@gmail.com',
        member2Email: 'arjun.menon@student.pccoe.edu',
        isPccoe: false,
        transactionId: 'TXN005HH'
    },
    {
        teamId: 'HH006',
        teamName: 'Lock Breakers',
        leaderEmail: 'kavya.pillai@gmail.com',
        member1Email: 'siddharth.gupta@gmail.com',
        member2Email: 'riya.chopra@student.pccoe.edu',
        isPccoe: false,
        transactionId: 'TXN006HH'
    },
    {
        teamId: 'HH007',
        teamName: 'Code Crackers',
        leaderEmail: 'aditya.malhotra@gmail.com',
        member1Email: 'tanvi.agarwal@gmail.com',
        member2Email: 'john.doe@student.pccoe.edu',
        isPccoe: false,
        transactionId: 'TXN007HH'
    },
    {
        teamId: 'HH008',
        teamName: 'Heist Heroes',
        leaderEmail: 'jane.smith@student.pccoe.edu',
        member1Email: 'vikram.singh@student.pccoe.edu',
        member2Email: 'alex.kumar@gmail.com',
        isPccoe: true,
        transactionId: 'TXN008HH'
    },
    {
        teamId: 'HH009',
        teamName: 'Stealth Squad',
        leaderEmail: 'rahul.sharma@student.pccoe.edu',
        member1Email: 'pooja.mehta@gmail.com',
        member2Email: 'karthik.raj@gmail.com',
        isPccoe: true,
        transactionId: 'TXN009HH'
    },
    {
        teamId: 'HH010',
        teamName: 'Brain Teasers',
        leaderEmail: 'priya.patel@gmail.com',
        member1Email: 'sneha.desai@gmail.com',
        member2Email: 'arjun.menon@student.pccoe.edu',
        isPccoe: false,
        transactionId: 'TXN010HH'
    }
];

// Dummy Prompt Ready team data
const promptReadyTeams = [
    {
        teamId: 'PR001',
        teamName: 'AI Wizards',
        leaderEmail: 'john.doe@student.pccoe.edu',
        member1Email: 'jane.smith@student.pccoe.edu',
        isPccoe: true,
        transactionId: 'TXN001PR'
    },
    {
        teamId: 'PR002',
        teamName: 'Prompt Engineers',
        leaderEmail: 'sneha.desai@gmail.com',
        member1Email: 'amit.verma@gmail.com',
        isPccoe: false,
        transactionId: 'TXN002PR'
    },
    {
        teamId: 'PR003',
        teamName: 'GPT Gurus',
        leaderEmail: 'alex.kumar@gmail.com',
        member1Email: 'priya.patel@gmail.com',
        isPccoe: false,
        transactionId: 'TXN003PR'
    },
    {
        teamId: 'PR004',
        teamName: 'LLM Legends',
        leaderEmail: 'rahul.sharma@student.pccoe.edu',
        member1Email: 'neha.joshi@student.pccoe.edu',
        isPccoe: true,
        transactionId: 'TXN004PR'
    },
    {
        teamId: 'PR005',
        teamName: 'AI Innovators',
        leaderEmail: 'vikram.singh@student.pccoe.edu',
        member1Email: 'pooja.mehta@gmail.com',
        isPccoe: true,
        transactionId: 'TXN005PR'
    },
    {
        teamId: 'PR006',
        teamName: 'ChatBot Builders',
        leaderEmail: 'rohan.reddy@gmail.com',
        member1Email: 'anjali.nair@student.pccoe.edu',
        isPccoe: false,
        transactionId: 'TXN006PR'
    },
    {
        teamId: 'PR007',
        teamName: 'NLP Ninjas',
        leaderEmail: 'karthik.raj@gmail.com',
        member1Email: 'divya.iyer@gmail.com',
        isPccoe: false,
        transactionId: 'TXN007PR'
    },
    {
        teamId: 'PR008',
        teamName: 'Semantic Savants',
        leaderEmail: 'arjun.menon@student.pccoe.edu',
        member1Email: 'kavya.pillai@gmail.com',
        isPccoe: true,
        transactionId: 'TXN008PR'
    },
    {
        teamId: 'PR009',
        teamName: 'Token Tacticians',
        leaderEmail: 'siddharth.gupta@gmail.com',
        member1Email: 'riya.chopra@student.pccoe.edu',
        isPccoe: false,
        transactionId: 'TXN009PR'
    },
    {
        teamId: 'PR010',
        teamName: 'Context Kings',
        leaderEmail: 'aditya.malhotra@gmail.com',
        member1Email: 'tanvi.agarwal@gmail.com',
        isPccoe: false,
        transactionId: 'TXN010PR'
    }
];

// Dummy Pixel Perfect registrations
const pixelPerfectRegistrations = [
    {
        leaderEmail: 'neha.joshi@student.pccoe.edu',
        isPccoe: true,
        transactionId: 'TXN001PP'
    },
    {
        leaderEmail: 'priya.patel@gmail.com',
        isPccoe: false,
        transactionId: 'TXN002PP'
    },
    {
        leaderEmail: 'rahul.sharma@student.pccoe.edu',
        isPccoe: true,
        transactionId: 'TXN003PP'
    },
    {
        leaderEmail: 'sneha.desai@gmail.com',
        isPccoe: false,
        transactionId: 'TXN004PP'
    },
    {
        leaderEmail: 'amit.verma@gmail.com',
        isPccoe: false,
        transactionId: 'TXN005PP'
    },
    {
        leaderEmail: 'vikram.singh@student.pccoe.edu',
        isPccoe: true,
        transactionId: 'TXN006PP'
    },
    {
        leaderEmail: 'rohan.reddy@gmail.com',
        isPccoe: false,
        transactionId: 'TXN007PP'
    },
    {
        leaderEmail: 'anjali.nair@student.pccoe.edu',
        isPccoe: true,
        transactionId: 'TXN008PP'
    },
    {
        leaderEmail: 'divya.iyer@gmail.com',
        isPccoe: false,
        transactionId: 'TXN009PP'
    },
    {
        leaderEmail: 'arjun.menon@student.pccoe.edu',
        isPccoe: true,
        transactionId: 'TXN010PP'
    }
];

const seedDatabase = async () => {
    try {
        // Connect to database
        await connectDB();
        console.log('Starting database seeding...');

        // Clear existing data
        console.log('Clearing existing data...');
        await studentInfo.deleteMany({});
        await hackMatrix.deleteMany({});
        await datathon.deleteMany({});
        await amongUs.deleteMany({});
        await houdiniHeist.deleteMany({});
        await promptReady.deleteMany({});
        await pixelPerfect.deleteMany({});
        console.log('Existing data cleared.');

        // Insert student info
        console.log('Inserting student info...');
        const insertedStudents = await studentInfo.insertMany(students);
        console.log(`Inserted ${insertedStudents.length} students.`);

        // Insert HackMatrix teams
        console.log('Inserting HackMatrix teams...');
        const insertedHackMatrix = await hackMatrix.insertMany(hackMatrixTeams);
        console.log(`Inserted ${insertedHackMatrix.length} HackMatrix teams.`);

        // Insert Datathon teams
        console.log('Inserting Datathon teams...');
        const insertedDatathon = await datathon.insertMany(datathonTeams);
        console.log(`Inserted ${insertedDatathon.length} Datathon teams.`);

        // Insert Among Us registrations
        console.log('Inserting Among Us registrations...');
        const insertedAmongUs = await amongUs.insertMany(amongUsRegistrations);
        console.log(`Inserted ${insertedAmongUs.length} Among Us registrations.`);

        // Insert Houdini Heist teams
        console.log('Inserting Houdini Heist teams...');
        const insertedHoudiniHeist = await houdiniHeist.insertMany(houdiniHeistTeams);
        console.log(`Inserted ${insertedHoudiniHeist.length} Houdini Heist teams.`);

        // Insert Prompt Ready teams
        console.log('Inserting Prompt Ready teams...');
        const insertedPromptReady = await promptReady.insertMany(promptReadyTeams);
        console.log(`Inserted ${insertedPromptReady.length} Prompt Ready teams.`);

        // Insert Pixel Perfect registrations
        console.log('Inserting Pixel Perfect registrations...');
        const insertedPixelPerfect = await pixelPerfect.insertMany(pixelPerfectRegistrations);
        console.log(`Inserted ${insertedPixelPerfect.length} Pixel Perfect registrations.`);

        console.log('\n✅ Database seeding completed successfully!');
        console.log('\nSummary:');
        console.log(`- Students: ${insertedStudents.length}`);
        console.log(`- HackMatrix teams: ${insertedHackMatrix.length}`);
        console.log(`- Datathon teams: ${insertedDatathon.length}`);
        console.log(`- Among Us registrations: ${insertedAmongUs.length}`);
        console.log(`- Houdini Heist teams: ${insertedHoudiniHeist.length}`);
        console.log(`- Prompt Ready teams: ${insertedPromptReady.length}`);
        console.log(`- Pixel Perfect registrations: ${insertedPixelPerfect.length}`);

        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

// Run the seed function
seedDatabase();
