import { renderIcon } from "@/utils";
import { h } from "vue";
import { RouterLink } from "vue-router";

const reqListIcon = "carbon:list-boxes";

export default {
  key: "Requirement List",
  icon: renderIcon(reqListIcon),
  label: () =>
    h(
      RouterLink,
      {
        to: {
          name: "Requirement-List-RequirementList",
        },
      },
      { default: () => "Requirement List" }
    ),
};
