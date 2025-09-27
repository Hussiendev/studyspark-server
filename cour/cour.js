// seed/seed.js
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import logger from "../utils/logger.js";
import { Subject } from "../db/modules/Subject.js"; 
import { Quiz } from "../db/modules/Quiz.js";
import { Flashcard } from "../db/modules/Flashcard.js";
const MONGO_URI = process.env.MONGO_URI;

const seed = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB for seeding...");

    await Subject.deleteMany({});
    await Flashcard.deleteMany({});
    await Quiz.deleteMany({});

    const subjects = await Subject.insertMany([
      { name: "Prospecting", description: "Finding potential leads" },
      { name: "Cold Calling", description: "Initiating contact with prospects" },
      { name: "Objection Handling", description: "Dealing with customer concerns" },
      { name: "Negotiation", description: "Reaching win-win deals" },
      { name: "Closing", description: "Finalizing the sale" }
    ]);

    const [pros, cold, obj, neg, close] = subjects;

    const flashcards = [
      // Prospecting (10)
      { subjectId: pros._id, question: "What is the goal of prospecting?", answer: "To identify potential customers who may benefit from your product." },
      { subjectId: pros._id, question: "Name one common prospecting method.", answer: "Cold calling, email outreach, referrals, or networking." },
      { subjectId: pros._id, question: "What does ICP mean?", answer: "Ideal Customer Profile." },
      { subjectId: pros._id, question: "What is a warm lead?", answer: "A lead who has previously engaged with your company." },
      { subjectId: pros._id, question: "Why qualify a lead?", answer: "To ensure you focus on prospects who have a higher chance to buy." },
      { subjectId: pros._id, question: "What is lead scoring?", answer: "Assigning a numeric value to prospects based on fit and engagement." },
      { subjectId: pros._id, question: "What tool helps track leads?", answer: "A CRM (Customer Relationship Management) system." },
      { subjectId: pros._id, question: "What is an outreach cadence?", answer: "A planned schedule of follow-ups to contact leads." },
      { subjectId: pros._id, question: "What is a value proposition?", answer: "A short statement describing the main benefit to the customer." },
      { subjectId: pros._id, question: "When should you ask for referrals?", answer: "After a positive interaction or successful outcome with a customer." },

      // Cold Calling (10)
      { subjectId: cold._id, question: "What is the primary goal of a cold call?", answer: "To start a conversation and qualify a potential customer." },
      { subjectId: cold._id, question: "What should a short opening include?", answer: "Your name, company, a quick reason for calling, and a question." },
      { subjectId: cold._id, question: "What's a good voicemail strategy?", answer: "Leave a brief value statement and a clear call to action." },
      { subjectId: cold._id, question: "Who is a gatekeeper?", answer: "A receptionist or assistant who controls access to decision-makers." },
      { subjectId: cold._id, question: "Why use open-ended questions?", answer: "They encourage the prospect to share information and needs." },
      { subjectId: cold._id, question: "What is a call objective?", answer: "A small, clear goal for the call (e.g., set a meeting)." },
      { subjectId: cold._id, question: "How long should an initial cold call be?", answer: "Short — just long enough to qualify interest (2–5 minutes)." },
      { subjectId: cold._id, question: "Why record calls (when allowed)?", answer: "For coaching and improving technique." },
      { subjectId: cold._id, question: "What metric measures cold calling success?", answer: "Connect rate and conversion rate." },
      { subjectId: cold._id, question: "What's the best follow-up after a brief 'no'?", answer: "Ask a permission question to follow up later." },

      // Objection Handling (10)
      { subjectId: obj._id, question: "Name a common objection.", answer: "Price, timing, authority, need, or product fit." },
      { subjectId: obj._id, question: "What's the first step when hearing an objection?", answer: "Acknowledge and understand it—don’t argue." },
      { subjectId: obj._id, question: "What is 'feel, felt, found'?", answer: "A technique to empathize and reframe objections." },
      { subjectId: obj._id, question: "Why ask clarifying questions?", answer: "To uncover the real concern behind the objection." },
      { subjectId: obj._id, question: "How to reframe price objections?", answer: "Show value and ROI rather than lowering price immediately." },
      { subjectId: obj._id, question: "How can case studies help?", answer: "They provide social proof that addresses objections." },
      { subjectId: obj._id, question: "What should you avoid when handling objections?", answer: "Arguing or getting defensive." },
      { subjectId: obj._id, question: "What to do after you answer an objection?", answer: "Confirm the objection is resolved." },
      { subjectId: obj._id, question: "What is an assumptive close?", answer: "Proceeding as if the objection is resolved and moving to next step." },
      { subjectId: obj._id, question: "When hearing 'I need to think about it', what to do?", answer: "Ask what specifically they need to think about." },

      // Negotiation (10)
      { subjectId: neg._id, question: "What is the goal of negotiation?", answer: "To reach a mutually beneficial agreement." },
      { subjectId: neg._id, question: "What is BATNA?", answer: "Best Alternative To a Negotiated Agreement." },
      { subjectId: neg._id, question: "What is anchoring?", answer: "Setting the initial reference or opening offer." },
      { subjectId: neg._id, question: "Why trade concessions?", answer: "To get value in exchange for concessions." },
      { subjectId: neg._id, question: "What should you focus on—positions or interests?", answer: "Interests (underlying needs) rather than fixed positions." },
      { subjectId: neg._id, question: "Why involve decision-makers?", answer: "They can authorize final agreements." },
      { subjectId: neg._id, question: "When make concessions, what is good practice?", answer: "Make them conditional and documented." },
      { subjectId: neg._id, question: "How can silence be used?", answer: "Silence can create space for the other side to reveal info." },
      { subjectId: neg._id, question: "Why get terms in writing?", answer: "To avoid misunderstandings later." },
      { subjectId: neg._id, question: "What’s a win-win outcome?", answer: "Both sides getting value from the agreement." },

      // Closing (10)
      { subjectId: close._id, question: "What is closing?", answer: "Guiding the prospect to make a decision." },
      { subjectId: close._id, question: "What is a trial close?", answer: "A small question to test readiness (e.g., 'Would that work for you?')." },
      { subjectId: close._id, question: "What is an assumptive close?", answer: "Proceeding as if they agreed and setting next steps." },
      { subjectId: close._id, question: "Why summarize benefits before closing?", answer: "To remind the prospect of value before asking for the order." },
      { subjectId: close._id, question: "How to handle last-minute objections?", answer: "Address calmly and confirm resolution before finalizing." },
      { subjectId: close._id, question: "What are simple next steps after closing?", answer: "Send contract, confirm onboarding, set kickoff date." },
      { subjectId: close._id, question: "Why offer options when closing?", answer: "Giving choices simplifies decision-making." },
      { subjectId: close._id, question: "What to do after the sale?", answer: "Follow up to ensure successful onboarding." },
      { subjectId: close._id, question: "What indicates a good time to ask for the order?", answer: "When the prospect shows verbal or behavioral buying signals." },
      { subjectId: close._id, question: "What is 'ask for the order' technique?", answer: "Directly request commitment to purchase when appropriate." }
    ];

    const quizzes = [
      // Prospecting quizzes
      { subjectId: pros._id, type: "mcq", question: "Which of the following is NOT a prospecting method?", options: ["Cold calling", "Email outreach", "Referral", "Watching movies"], correctAnswer: "Watching movies", explanation: "Watching movies is not a prospecting method." },
      { subjectId: pros._id, type: "true_false", question: "An ICP describes your ideal customer.", options: ["True","False"], correctAnswer: "True", explanation: "ICP = Ideal Customer Profile." },
      { subjectId: pros._id, type: "mcq", question: "What does a CRM do?", options: ["Track leads and interactions","Build hardware","Write emails automatically","None"], correctAnswer: "Track leads and interactions", explanation: "CRM stores customer interactions and pipeline." },
      { subjectId: pros._id, type: "mcq", question: "What is lead scoring used for?", options: ["Assign priority to leads","Delete leads","Hide leads","Export leads"], correctAnswer: "Assign priority to leads", explanation: "Lead scoring helps prioritize outreach." },
      { subjectId: pros._id, type: "mcq", question: "Best first step after collecting a business card at an event?", options: ["Add to CRM and send a personalized follow-up","Throw it away","Call them immediately without context","Wait a year"], correctAnswer: "Add to CRM and send a personalized follow-up", explanation: "A timely personalized follow-up is best." },

      // Cold Calling quizzes
      { subjectId: cold._id, type: "mcq", question: "Primary goal of a cold call?", options: ["Start a conversation and qualify", "Close the sale immediately", "Give a long demo", "Ask for a referral"], correctAnswer: "Start a conversation and qualify", explanation: "Cold calls aim to start conversations and qualify leads." },
      { subjectId: cold._id, type: "true_false", question: "Voicemail should be long and very detailed.", options: ["True","False"], correctAnswer: "False", explanation: "Keep voicemail short and value-focused." },
      { subjectId: cold._id, type: "mcq", question: "Who is a gatekeeper?", options: ["Decision-maker", "Receptionist/assistant", "Competitor", "Supplier"], correctAnswer: "Receptionist/assistant", explanation: "Gatekeepers manage access to decision-makers." },

      // Objection Handling quizzes
      { subjectId: obj._id, type: "mcq", question: "If a prospect says 'It's too expensive', best response is:", options: ["Explain value and ROI", "Hang up", "Argue", "Ignore"], correctAnswer: "Explain value and ROI", explanation: "Reframe price as value/ROI." },
      { subjectId: obj._id, type: "true_false", question: "You should argue with a customer’s objection until they agree.", options: ["True","False"], correctAnswer: "False", explanation: "Objections should be understood and addressed, not argued." },
      { subjectId: obj._id, type: "mcq", question: "The 'Feel-Felt-Found' technique is used to:", options: ["Handle objections","Close a sale instantly","Create a contract","Fix product bugs"], correctAnswer: "Handle objections", explanation: "It's a common objection-handling phrasing." },

      // Negotiation quizzes
      { subjectId: neg._id, type: "mcq", question: "What does BATNA stand for?", options: ["Best Alternative To a Negotiated Agreement", "Better And Timely Negotiation Action", "Best Available Tactical Negotiation Approach", "None"], correctAnswer: "Best Alternative To a Negotiated Agreement", explanation: "BATNA is your fallback option." },
      { subjectId: neg._id, type: "true_false", question: "Always make the first big concession.", options: ["True","False"], correctAnswer: "False", explanation: "Concessions should be strategic." },

      // Closing quizzes
      { subjectId: close._id, type: "mcq", question: "Closing a sale means:", options: ["Guiding the prospect to a decision", "Forcing the customer", "Only using discounts", "Never following up"], correctAnswer: "Guiding the prospect to a decision", explanation: "Closing is guiding to a decision, not forcing." },
      { subjectId: close._id, type: "mcq", question: "A trial close is used to:", options: ["Gauge readiness","Cancel the deal","Delay indefinitely","Give a discount"], correctAnswer: "Gauge readiness", explanation: "Trial closes test if the prospect is ready." },
      { subjectId: close._id, type: "true_false", question: "After closing, sending onboarding steps is recommended.", options: ["True","False"], correctAnswer: "True", explanation: "Onboarding helps deliver value post-sale." }
    ];

    await Flashcard.insertMany(flashcards);
    await Quiz.insertMany(quizzes);

    logger.info("Seeding complete.");
    logger.info("Subjects:", subjects.length);
    logger.info("Flashcards:", await Flashcard.countDocuments());
    logger.info("Quizzes:", await Quiz.countDocuments());
    mongoose.disconnect();
  } catch (err) {
    logger.error("Seeding error:", err);
    mongoose.disconnect();
  }
};

seed();
