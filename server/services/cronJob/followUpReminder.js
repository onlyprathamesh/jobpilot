const Job = require("../../models/jobModel");
const Reminder = require("../../models/reminderModel");
const User = require("../../models/userModel");
const { addBusinessDays } = require("../../utils/calculateBuisnessDays");
const cron = require("node-cron");
const sendWhatsappReminder = require("./whatsappReminder");

const followUpReminder = () => {
    cron.schedule("0 17 * * *", async () => {
        console.log("Running daily checkup at 9AM");

        try {
            const users = await User.find();
            
            for (const user of users) {
                const jobs = await Job.find({userId:user._id, followUpDone:false});
                
                for (const job of jobs) {
                    const followUpDate = addBusinessDays(job.applicationDate, job.followUpDelay);
                    const today = new Date();
                    
                    if (followUpDate.toDateString() <= today.toDateString()) {
                        const alreadyReminded = await Reminder.findOne({jobId: job._id});

                        if (!alreadyReminded) {
                            const reminder = await Reminder.create({userId: user._id, jobId: job._id, reminderText: `Hey ${user.userName}, follow up with ${job.companyName} for ${job.role} role.`});
                            await sendWhatsappReminder({message: reminder.reminderText});
                        }
                    }
                }
            }
        } catch (error) {
            console.error("Error running reminder cron job:", error.message);
        }
    })
};

module.exports = {followUpReminder};



