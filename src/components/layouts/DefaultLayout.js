import styled from "@emotion/styled";
import { AdminPanelSettings, Home, Key, RssFeed } from "@mui/icons-material";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import ApartmentIcon from "@mui/icons-material/Apartment";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import CommentIcon from "@mui/icons-material/Comment";
import GroupsIcon from "@mui/icons-material/Groups";
import InfoIcon from "@mui/icons-material/Info";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import PostAddIcon from "@mui/icons-material/PostAdd";
import ShieldIcon from "@mui/icons-material/Shield";
import React from "react";
import { MultiLanguage, UserRole } from "../../config/const";
import I18nHelper from "../../helpers/i18n.helper";
import i18n from "./../../i18n/index";
import DefaultFunction from "./components/DefaultFunction";
import DisplayContent from "./components/DisplayContent";
import ProfileHeader from "./components/ProfileHeader";
import MobileBar from "./components/bar/MobileBar";
import Footer from "./components/footer/Footer";
import AcceptCookie from "./components/footer/components/AcceptCookie";
import CustomFooter from "./components/footer/CustomFooter";

const DefaultLayoutContainer = styled("div")(() => ({}));

export default function DefaultLayout(props) {
  const [visibleBar, setVisibleBar] = React.useState(false);
  const onShowBar = () => {
    setVisibleBar(true);
  };
  const onHideBar = () => {
    setVisibleBar(false);
  };
  const { t } = i18n;
  const { userInfo } = props;
  const headerList = [
    {
      content: t("common.header.home"),
      link: "/",
      roles: [],
      icon: <Home color="black" />,
    },
    {
      content: t("common.header.admin"),
      roles: [UserRole.admin],
      disable: true,
      icon: <AdminPanelSettings color="black" />,
      options: [
        {
          content: t("common.header.blogList"),
          link: "/admin/career-list",
          roles: [UserRole.admin],
          icon: <PostAddIcon />,
        },
        {
          content: t("common.header.companyList"),
          link: "/admin/company-list",
          roles: [UserRole.admin],
          icon: <ApartmentIcon />,
        },
        {
          content: t("common.header.roleList"),
          link: "/admin/role-list",
          roles: [UserRole.admin],
          icon: <AdminPanelSettingsIcon />,
        },
        {
          content: t("common.header.permissionList"),
          link: "/admin/permission-list",
          roles: [UserRole.admin],
          icon: <ShieldIcon />,
        },
        {
          content: t("common.header.commentList"),
          link: "/admin/comment-list",
          roles: [UserRole.admin],
          icon: <CommentIcon />,
        },
        {
          content: t("common.header.jobList"),
          link: "/admin/job-list",
          roles: [UserRole.admin],
          icon: <CommentIcon />,
        },
        {
          content: t("common.header.locationList"),
          link: "/admin/location-list",
          roles: [UserRole.admin],
          icon: <CommentIcon />,
        },
        {
          content: t("common.header.userList"),
          link: "/admin/user-list",
          roles: [UserRole.admin],
          icon: <GroupsIcon />,
        },
        {
          content: t("common.header.profileList"),
          link: "/admin/profile-list",
          roles: [UserRole.admin],
          icon: <AssignmentIndIcon />,
        },
        {
          content: t("common.header.tagList"),
          link: "/admin/tag-list",
          roles: [UserRole.admin],
          icon: <LocalOfferIcon />,
        },
      ],
    },
    {
      content: t("common.header.aboutMe"),
      link: "/about-me",
      roles: [],
      icon: <InfoIcon color="black" />,
    },
    {
      content:
        i18n?.language === MultiLanguage.vi
          ? t("common.header.english")
          : t("common.header.vietnamese"),
      onClick: () => {
        I18nHelper.instance.onSwitchLanguage();
      },
      roles: [],
      icon: <RssFeed color="orange" />,
    },
    {
      render: <ProfileHeader {...props} />,
      content: t("common.header.login"),
      roles: [],
      link: userInfo?.id ? "/login" : null,
      icon: <Key color="black" />,
    },
  ];

  const headerView = React.useMemo(() =>
    (headerList ?? []).filter((item) => {
      const strRoleList = item?.roles?.map((itemRole) => String(itemRole));
      const strRole = String(userInfo.role);

      return !item?.roles?.length || strRoleList?.includes(strRole);
    })
  );

  return (
    <DefaultLayoutContainer className="main-layout">
      <MobileBar
        onHideBar={onHideBar}
        onShowBar={onShowBar}
        visibleBar={visibleBar}
        headerView={headerView}
      ></MobileBar>
      <DisplayContent {...props} />
      <AcceptCookie />
      <CustomFooter />
    </DefaultLayoutContainer>
  );
}
