import { renderIcon } from "@/utils"
import { h } from "vue"
import { RouterLink } from "vue-router"
import { type MenuMixedOption } from "naive-ui/es/menu/src/interface"

const BlankIcon = "carbon:document-blank"
const TypographyIcon = "fluent:text-font-16-regular"
const MultiLanguageIcon = "ion:language-outline"
const GroupIcon = "carbon:tree-view"
const IconsIcon = "fluent:icons-24-regular"

// import dashboard from "./dashboard"

import apps from "./apps"

import companylist from "./companylist"
import companyDetailsList from "./companyDetailsList"
import requirementList from "./requirementList"
import poolList from "./poolList"
import assignToBDList from "./assignToBDList"

export default function getItems(mode: "vertical" | "horizontal", collapsed: boolean): MenuMixedOption[] {
	return [
    companylist,
    companyDetailsList,
    requirementList,
    poolList,
    assignToBDList,
  ];
}
