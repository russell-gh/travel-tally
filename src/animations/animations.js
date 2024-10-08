import gsap from "gsap";

export function animationPopUp(ref, reverse, closePopUp) {
  if (!ref) return;

  const animation = gsap.fromTo(
    ref,
    { scale: 0, xPercent: -50, yPercent: -50 },
    {
      scale: 1,
      duration: 0.8,
      onReverseComplete: () => {
        closePopUp();
      },
    }
  );

  if (reverse) {
    animation.reverse(0);
  }
}
