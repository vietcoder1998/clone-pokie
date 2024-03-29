import copy from "copy-to-clipboard";
import { toast } from "react-toastify";

export default function useCopy(props) {
  const onCopy = (content) => {
    copy(content ?? props.content, {
      debug: true,
      message: "Press #{key} to copy",
    });
    toast.success(`Copy ${content ?? props.content}`);
  };

  return { onCopy };
}
