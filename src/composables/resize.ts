import { onBeforeUnmount, onMounted, ref, Ref } from "vue";

/**
 * Use the layout for an element responsively.
 *
 * @param el The element to observe
 * @returns The layout properties for the element, as observed
 */
export function useElementLayout(el: Ref<HTMLElement | null>) {
  const top = ref(0);
  const left = ref(0);
  const width = ref(0);
  const height = ref(0);

  const observer = new ResizeObserver((entries) => {
    const entry = entries[0];
    if (entry) {
      top.value = entry.contentRect.top;
      left.value = entry.contentRect.left;
      width.value = entry.contentRect.width;
      height.value = entry.contentRect.height;
    }
  });

  // Refs are not null once mounted
  onMounted(() => observer.observe(el.value as HTMLElement));
  onBeforeUnmount(() => observer.unobserve(el.value as HTMLElement));

  return { top, left, width, height };
}
