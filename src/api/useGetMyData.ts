
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { getLiveTranscriptionsUrl } from "./apiConstants";
import { useInfiniteQuery } from "react-query";

function useGetMyData() {
  const [searchParams] = useSearchParams();

  const startTime = searchParams.get("startTime");
  const endTime = searchParams.get("endTime");
  const selectedChannel = searchParams.get("selectedChannel");
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");
  const searchText = searchParams.get("query") ?? "";

  // isLive is either null of false. If it's null, it means it's true
  const live = searchParams.get("isLive") ?? null;
  const isLive = live ? false : true;

  return useInfiniteQuery({
    queryKey: [
      "liveTranscriptions",
      startDate,
      endDate,
      startTime,
      endTime,
      searchText,
      selectedChannel,
    ],
    initialPageParam: 1,
    queryFn: async ({ pageParam = 1 }) => {
      const response =
        await axios.get(
          getLiveTranscriptionsUrl,
          {
            params: {
              page: pageParam,
              filters: {
                startTime,
                endTime,
                startDate,
                endDate,
                searchText,
                selectedChannel,
              },
            },
          },
        );

      return response.data
    },
    getNextPageParam: (lastPage) => {
      const currentPage = lastPage.pagination_data.current_page;
      const totalPages = lastPage.pagination_data.total_pages;
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
    select: (data) => {
      return data;
    },

    refetchInterval: isLive ? 3000 : false,
  });
}

export default useGetMyData;
