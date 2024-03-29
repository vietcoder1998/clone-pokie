import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import React from "react";
import Divider from "@mui/material/Divider";

export default function TagDisplay({
  tagList,
  tagBlogList,
  setTagList,
  disableShowAllTag,
  t,
}) {
  const onRemoveTagList = React.useCallback(
    (name) => {
      const newTagList = tagBlogList.filter((item) => item !== name);

      setTagList(newTagList);
    },
    [setTagList, tagBlogList]
  );

  const onAddTag = React.useCallback(
    (name) => {
      const newTagList = tagBlogList.filter((item) => item !== name);
      newTagList.push(name);

      setTagList(newTagList);
    },
    [setTagList, tagBlogList]
  );

  const AllTagUI = React.useMemo(() => {
    if (disableShowAllTag) {
      return "";
    }

    return tagList
      ?.filter((item) => item?.name)
      ?.filter((item) => !tagBlogList?.includes(item.name))
      ?.map((tag) => {
        return (
          <Chip
            key={tag}
            label={tag?.name}
            size={"small"}
            onClick={() => onAddTag(tag.name)}
          />
        );
      });
  }, [disableShowAllTag, onAddTag, tagBlogList, tagList]);

  const TagListUI = React.useMemo(() => {
    return tagBlogList?.map((tag) => {
      return disableShowAllTag ? (
        <Chip key={tag} size={"small"} label={tag} />
      ) : (
        <Chip
          key={tag}
          size={"small"}
          label={tag}
          onDelete={() => onRemoveTagList(tag)}
        />
      );
    });
  }, [disableShowAllTag, onRemoveTagList, tagBlogList]);

  return (
    <Box sx={{ mb: 2 }}>
      <Box component={"div"} sx={{ mb: 1 }}>
        <Typography sx={{ fontSize: "1.2rem" }}>
          <b>{t("pages.blog.tags")}</b>
        </Typography>
      </Box>
      <Box sx={{ mb: 1, display: "flex", gap: 1 }}>{AllTagUI}</Box>
      <Box sx={{ mb: 1, display: "flex", gap: 1 }}>{TagListUI}</Box>
    </Box>
  );
}
