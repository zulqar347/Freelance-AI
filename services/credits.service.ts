import ConnectDB from "@/lib/db";
import User from "@/lib/models/User";

export async function executeWithCredits<T>(
  userId: string,
  operation: () => Promise<T>,
): Promise<T> {
  await ConnectDB();

  // Atomically consume one credit
  const user = await User.findOneAndUpdate(
    {
      _id: userId,
      credits: { $gt: 0 },
    },
    {
      $inc: {
        credits: -1,
      },
    },
    {
      new: true,
    },
  );

  if (!user) {
    throw new Error("Not enough credits.");
  }

  try {
    const result = await operation();

    // Future:
    // await CreditLog.create(...)
    // await UsageLog.create(...)

    return result;
  } catch (error) {
    // Refund the credit
    await User.findByIdAndUpdate(userId, {
      $inc: {
        credits: 1,
      },
    });

    throw error;
  }
}
