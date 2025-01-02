import { axiosRequest } from "../config/axios.config";

export default {
  getStatistic: async ({ during, number }: { during: "monthly" | "yearly"; number: number }) => {
    const url = `/datasvc/api/statisticsRoad`;
    const requestUrl = `${url}?during=${during}&number=${number}`;
    try {
      const statisticInfo = await axiosRequest.get(requestUrl);
      return statisticInfo;
    } catch (error) {
      console.error("Error fetching statistics road:", error);
      throw error;
    }
  },
};
