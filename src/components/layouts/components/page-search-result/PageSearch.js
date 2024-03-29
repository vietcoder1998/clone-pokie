import styled from "@emotion/styled";
import { Search } from "@mui/icons-material";
import { Box, Chip, Divider, MenuList } from "@mui/material";
import { useRouter } from "next/router";
import ListUI from "../../../ListUI";
import LoadingComponent from "../../../Loading";

const SearchContainer = styled("div")(() => ({
  display: "flex",
  paddingX: 20,
  width: "-webkit-fill-available",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "0.8rem",
  width: "100%",
}));

const SearchItem = styled("div")(() => ({
  width: "100%",
  cursor: "pointer",
  display: "flex",
  justifyContent: "left",
  alignItems: "left",
  flexDirection: "column",
  "&:hover": {
    backgroundColor: "whitesmoke",
  },
  mb: 1,
  p: 1,
  fontWeight: 400,
  borderRadius: 2,
  border: "none", //
}));

const SearchTitle = styled("div")(() => ({
  mb: 1,
  px: 1,
  py: 0,
  display: "flex",
  justifyContent: "left",
  alignItems: "left",
}));

const SearchTagContainer = styled("p")(() => ({
  marginTop: 5,
}));

export default function PageSearchResult(props) {
  const {
    searchList,
    onCloseModal,
    onChangeTextSearch,
    isShowSearchModal,
    blogLoading,
  } = props;

  const navigate = useRouter();
  const onNavigateToBlog = (e) => {
    const slug = e?.target?.id;

    navigate.push(`/blog/${slug}`);
    onCloseModal();
  };
  const firstBlog = searchList?.at(0);
  const onSearchKeyDown = (e) => {
    if (e.keyCode === 13) {
      onNavigateToFirstBlog();
    }
  };
  const onNavigateToFirstBlog = () => {
    const { slug } = firstBlog;

    navigate.push(`/blog/${slug}`);
    onCloseModal();
  };
  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          px: 2,
          py: 1,
          width: "-webkit-fill-available",
          width: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            paddingX: 1,
          }}
        >
          <Search />
        </Box>
        <input
          style={{ padding: 10, border: "none", fontSize: "1.2rem" }}
          onChange={onChangeTextSearch}
          onKeyDown={onSearchKeyDown}
          placeholder="Tìm kiếm blog ..."
          variant="standard"
        />
      </Box>
      <Divider />
      <SearchContainer
        sx={{
          display: "flex",
          padding: 0,
          overflow: "scroll",
          width: "100%",
        }}
      >
        <LoadingComponent loading={blogLoading}>
          <ListUI hide={!searchList?.length} sx={{ px: 20 }}>
            <MenuList sx={{ pl: 2, maxHeight: "60vh" }}>
              {searchList?.map((item, index) => (
                <SearchItem
                  key={`blog_${index}`}
                  component="button"
                  id={item?.slug}
                  onClick={onNavigateToBlog}
                >
                  <SearchTitle>{item?.title?.slice(0, 50)}</SearchTitle>
                  <SearchTagContainer>
                    {item?.tags?.map((tag) => (
                      <Chip key={tag} size={"small"} label={tag} />
                    ))}
                  </SearchTagContainer>
                </SearchItem>
              ))}
            </MenuList>
          </ListUI>
        </LoadingComponent>
      </SearchContainer>
    </Box>
  );
}
