import { renderIcon } from "@/utils";
import { h } from "vue";
import { RouterLink } from "vue-router";

const PoolListIcon = "carbon:list";

export default {
  key: "Pool List",
  icon: renderIcon(PoolListIcon),
  label: () =>
    h(
      RouterLink,
      {
        to: {
          name: "Pool-list-PoolList",
        },
      },
      { default: () => "Pool List" }
    ),
};
