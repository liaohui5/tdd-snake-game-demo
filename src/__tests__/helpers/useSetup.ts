import { mount } from "@vue/test-utils";

export function useSetup(setup: () => void) {
  const wrapper = mount({
    render() {},
    setup,
  });

  return {
    wrapper,
  };
}
