import { renderIcon } from "@/utils";
import { h } from "vue";
import { RouterLink } from "vue-router";

const assignToBDListIcon = "carbon:classification";

export default {
  key: "Assigned Dt",
  icon: renderIcon(assignToBDListIcon),
  label: () =>
    h(
      RouterLink,
      {
        to: {
          name: "assign-bd-AssignedBDList",
        },
      },
      { default: () => "Assigned Dt" }
    ),
};
