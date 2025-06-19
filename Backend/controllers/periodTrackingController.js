import { PeriodTracking } from "../models/periodTrackingModel.js";
import { User } from "../models/userModel.js";

export const trackerDataController = async (req, res) => {
  const { ...trackerData } = req.body;
  const userId = req.user.clerkId || req.user._id; 

  try {
    const newPeriodTracking = new PeriodTracking({
      user: userId,
      ...trackerData,
    });

    await newPeriodTracking.save();
    console.log("Tracker data submitted:", newPeriodTracking);
    res
      .status(201)
      .json({ message: "Period tracking data saved successfully" });
  } catch (error) {
    console.error("Error saving period tracking data:", error);
    res.status(500).json({
      message: "Error saving period tracking data",
      error: error.message,
    });
  }
};

export const periodTrackingController = async (req, res) => {
  const { userId } = req.params;
  const authenticatedUserId = req.user.clerkId || req.user._id; 
  
  const userIdToQuery = userId === 'me' ? authenticatedUserId : userId;
  
  
  if (userIdToQuery !== authenticatedUserId) {
    return res.status(403).json({ message: "You can only access your own data" });
  }

  try {
    const periodTrackingData = await PeriodTracking.findOne({
      user: userIdToQuery,
    }).sort({ date: -1 });
    
    if (!periodTrackingData) {
      return res
        .status(404)
        .json({ message: "No period tracking data found for this user" });
    }
    
    
    const user = {
      _id: authenticatedUserId,
      name: req.user.name,
      email: req.user.email
    };
    
    res.status(200).json({ periodTrackingData, user });
  } catch (error) {
    console.error("Error fetching period tracking data:", error);
    res.status(500).json({
      message: "Error fetching period tracking data",
      error: error.message,
    });
  }
};
export const waterUpdateController = async (req, res) => {
  const { userId } = req.params;
  const authenticatedUserId = req.user.clerkId || req.user._id; 
  
  const userIdToQuery = userId === 'me' ? authenticatedUserId : userId;
  
  
  if (userIdToQuery !== authenticatedUserId) {
    return res.status(403).json({ message: "You can only update your own data" });
  }
  
  try {
    const today = new Date().toISOString().slice(0, 10);

    let tracking = await PeriodTracking.findOne({ user: userIdToQuery });

    if (!tracking) {
      tracking = await PeriodTracking.create({
        user: userIdToQuery,
        waterIntakeCount: 1,
        lastWaterLogDate: today,
      });
    } else {
      if (tracking.waterIntakeCount >= 8) {
        return res.status(400).json({
          message: "You have already logged 8 glasses of water today.",
        });
      }
      if (tracking.lastWaterLogDate !== today) {
        tracking.waterIntakeCount = 1;
        tracking.lastWaterLogDate = today;
      } else {
        tracking.waterIntakeCount += 1;
      }
      await tracking.save();
    }
    res.status(200).json({
      message: `Water intake updated successfully. Current count: ${tracking.waterIntakeCount}`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error updating water intake data",
      error: error.message,
    });
  }
};
