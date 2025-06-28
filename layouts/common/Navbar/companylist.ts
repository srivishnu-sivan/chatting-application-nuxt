import { renderIcon } from "@/utils";
import { h } from "vue";
import { RouterLink } from "vue-router";

const DashboardIcon = "carbon:dashboard";

export default {
 
  key: "Company List",
  icon: renderIcon(DashboardIcon),
  label: () =>
    h(
      RouterLink,
      {
        to: {
          name: "Companylist-CompanyList",
        },
      },
      { default: () => "Company List" }
    ),
};
