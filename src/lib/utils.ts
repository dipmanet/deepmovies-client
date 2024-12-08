import { IMAGE_URL } from "./requests";

export const cn = (...inputs: string[]) => {
	return inputs.join(" ");
};

export const getImageUrl = (image_id: string, options = { width: 600, height: 900 }) => {
	return image_id ? `${IMAGE_URL}w${options.width}_and_h${options.height}_bestv2${image_id}` : "";
};

interface TimeProps {
	hours?: number;
	minutes?: number;
	seconds?: number;
}
export const getHoursTime = ({ hours = 0, minutes = 0, seconds = 0 }: TimeProps) => {
	const totalSec = hours * 3600 + minutes * 60 + seconds;
	const hr = Math.floor(totalSec / 3600);
	const min = Math.floor((totalSec - hr * 3600) / 60);
	const sec = totalSec % 60;
	return `${hr > 0 ? (hr === 1 ? hr + " hr " : hr + " hrs ") : ""}${
		min > 0 ? (min === 1 ? min + " min " : min + " mins ") : ""
	}${sec > 0 ? (sec === 1 ? sec + " sec " : sec + " secs ") : ""}`;
};
