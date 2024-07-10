import gsap from "gsap";

export function animationPopUp(ref, reverse) {
  if (!ref) return;

  const animation = gsap.fromTo(
    ref,
    { scale: 0, xPercent: -50, yPercent: -50 },
    {
      scale: 1,
      duration: 0.8,
    }
  );

  if (reverse) {
    animation.reverse(0);
  }
}
