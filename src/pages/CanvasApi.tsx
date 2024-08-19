import useDateTimeUtils from "../hooks/useDateTimeUtils";
import { downloadTextAsImage, wrapText } from "../utils/helpers";
import logo1 from "../assets/ary-logo.png";
import logo2 from "../assets/logo.webp";

const selectedOneMinuteSttData = [
  {
    channelLogo: "https://example.com/logo1.png",
    channelName: "Channel 1",
    createdAt: "2023-08-19T12:34:56Z",
    startTime: 12345,
    transcription:
      "This is a sample transcription for channel 1.This is a sample transcription for channel 1.This is a sample transcription for channel 1.This is a sample transcription for channel 1.This is a sample transcription for channel 1.This is a sample transcription for channel 1.This is a sample transcription for channel 1.This is a sample transcription for channel 1.This is a sample transcription for channel 1.This is a sample transcription for channel 1.This is a sample transcription for channel 1.This is a sample transcription for channel 1.This is a sample transcription for channel 1.This is a sample transcription for channel 1.This is a sample transcription for channel 1.This is a sample transcription for channel 1.This is a sample transcription for channel 1.This is a sample transcription for channel 1.This is a sample transcription for channel 1.This is a sample transcription for channel 1.This is a sample transcription for channel 1.This is a sample transcription for channel 1.This is a sample transcription for channel 1.This is a sample transcription for channel 1.This is a sample transcription for channel 1.This is a sample transcription for channel 1.",
    transcriptionId: 1,
  },
  {
    channelLogo: "https://example.com/logo4.png",
    channelName: "Channel 1",
    createdAt: "2023-08-19T12:34:56Z",
    startTime: 12345,
    transcription:
      "This is a sample transcription for channel 1.This is a sample transcription for channel 1.This is a sample transcription for channel 1.This is a sample transcription for channel 1.This is a sample transcription for channel 1.This is a sample transcription for channel 1.This is a sample transcription for channel 1.This is a sample transcription for channel 1.This is a sample transcription for channel 1.This is a sample transcription for channel 1.This is a sample transcription for channel 1.This is a sample transcription for channel 1.This is a sample transcription for channel 1.This is a sample transcription for channel 1.This is a sample transcription for channel 1.This is a sample transcription for channel 1.This is a sample transcription for channel 1.This is a sample transcription for channel 1.This is a sample transcription for channel 1.This is a sample transcription for channel 1.This is a sample transcription for channel 1.This is a sample transcription for channel 1.This is a sample transcription for channel 1.This is a sample transcription for channel 1.This is a sample transcription for channel 1.This is a sample transcription for channel 1.",
    transcriptionId: 1,
  },
  {
    channelLogo: "https://example.com/logo2.png",
    channelName: "Channel 2",
    createdAt: "2023-08-19T13:34:56Z",
    startTime: 12346,
    transcription:
      "This is a sample transcription for channel 1.This is a sample transcription for channel 1.This is a sample transcription for channel 1.This is a sample transcription for channel 1.This is a sample transcription for channel 1.This is a sample transcription for channel 1.This is a sample transcription for channel 1.This is a sample transcription for channel 1.This is a sample transcription for channel 1.This is a sample transcription for channel 1.This is a sample transcription for channel 1.This is a sample transcription for channel 1.This is a sample transcription for channel 1.This is a sample transcription for channel 1.This is a sample transcription for channel 1.This is a sample transcription for channel 1.This is a sample transcription for channel 1.This is a sample transcription for channel 1.This is a sample transcription for channel 1.This is a sample transcription for channel 1.This is a sample transcription for channel 1.This is a sample transcription for channel 1.This is a sample transcription for channel 1.This is a sample transcription for channel 1.This is a sample transcription for channel 1.This is a sample transcription for channel 1.",
    transcriptionId: 2,
  },
  {
    channelLogo: "https://example.com/logo3.png",
    channelName: "Channel 2",
    createdAt: "2023-08-19T13:34:56Z",
    startTime: 12346,
    transcription:
      "This is a sample transcription for channel 1.This is a sample transcription for channel 1.This is a sample transcription for channel 1.This is a sample transcription for channel 1.This is a sample transcription for channel 1.This is a sample transcription for channel 1.This is a sample transcription for channel 1.This is a sample transcription for channel 1.This is a sample transcription for channel 1.This is a sample transcription for channel 1.This is a sample transcription for channel 1.This is a sample transcription for channel 1.This is a sample transcription for channel 1.This is a sample transcription for channel 1.This is a sample transcription for channel 1.This is a sample transcription for channel 1.This is a sample transcription for channel 1.This is a sample transcription for channel 1.This is a sample transcription for channel 1.This is a sample transcription for channel 1.This is a sample transcription for channel 1.This is a sample transcription for channel 1.This is a sample transcription for channel 1.This is a sample transcription for channel 1.This is a sample transcription for channel 1.This is a sample transcription for channel 1.",
    transcriptionId: 2,
  },
];

const CanvasApi = () => {
  const { formatDate, formatTime } = useDateTimeUtils();
  const downloadImageFromCanvas = () => {
    const imageUrls = [logo1, logo2, logo1, logo2];
    let textToDownload = "";
    const canvas = document.querySelector("canvas");
    if (canvas) {
      const ctx = canvas.getContext("2d");
      const canvasWidth = canvas.width;
      if (ctx) {
        for (const oneMinuteChunk of selectedOneMinuteSttData) {
          //   imageUrls.push(oneMinuteChunk.channelLogo);
          textToDownload += `Date: ${formatDate(oneMinuteChunk.createdAt)}\n`;
          textToDownload += `Time: ${formatTime(oneMinuteChunk.createdAt)}\n`;

          const wrappedTranscription = wrapText(
            ctx,
            `Text: ${oneMinuteChunk.transcription}`,
            canvasWidth * 0.8 - 20 // max text width is 80% of canvas width minus some padding
          );
          textToDownload += wrappedTranscription.join("\n") + "\n";
          textToDownload +=
            "-------------------------------------------------------------------------\n\n";
        }
        downloadTextAsImage(
          canvas,
          ctx,
          textToDownload,
          "sttImage.png",
          imageUrls
        );
      }
    }
  };
  return (
    <div className="w-full h-full flex flex-col justify-start items-center gap-3">
      <button
        onClick={downloadImageFromCanvas}
        className="text-gray-900 font-semibold text-sm bg-gray-200 hover:bg-gray-300 px-3 py-2 rounded-md"
      >
        Download Image
      </button>
      <canvas
        width={800}
        height={600}
        // style={{ display: "none" }}
        className="border-2 border-red-500"
      ></canvas>
    </div>
  );
};

export default CanvasApi;
