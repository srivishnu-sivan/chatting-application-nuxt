import { renderIcon } from "@/utils";
import { h } from "vue";
import { RouterLink } from "vue-router";

const DashboardIcon = "carbon:chart-point";

export default {
  key: "Company Details List",
  icon: renderIcon(DashboardIcon),
  label: () =>
    h(
      RouterLink,
      {
        to: {
          name: "Companylist-CompanyDetailsList",
        },
      },
      { default: () => "Company Details List" }
    ),
};
