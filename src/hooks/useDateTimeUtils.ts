function useDateTimeUtils() {
    const secondsToTimeString = (seconds: number) => {
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const remainingSeconds = Math.floor(seconds % 60);
  
      return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
    };
  
    const secondsTo12HourTimeString = (seconds: number) => {
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const remainingSeconds = Math.floor(seconds % 60);
  
      const ampm = hours >= 12 ? "PM" : "AM";
  
      const hours12 = hours % 12 || 0;
  
      return `${hours12.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")} ${ampm}`;
    };
  
    const formatTime = (time: string) => {
      return new Intl.DateTimeFormat("default", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      }).format(new Date(time));
    };
  
    const formatDate = (date: string) => {
      return new Intl.DateTimeFormat("default", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }).format(new Date(date));
    };
  
    return {
      secondsToTimeString,
      secondsTo12HourTimeString,
      formatTime,
      formatDate,
    };
  }
  
  export default useDateTimeUtils;
  