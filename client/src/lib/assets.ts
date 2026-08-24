/** Field Guide yang Tenang: preview memakai storage managed; build GitHub memakai aset repository agar deployment mandiri. */
const managedAssets = {
  hero: "/manus-storage/envsusta-hero-field-guide_8380f663.jpg",
  carbonOrbit: "/manus-storage/envsusta-carbon-orbit_de5638d2.jpg",
  learningAtlas: "/manus-storage/envsusta-learning-atlas_084c4eb7.jpg",
  orbitMark: "/manus-storage/envsusta-orbit-mark_af6cbc9d.png",
};

const repositoryAssets = {
  hero: `${import.meta.env.BASE_URL}assets/envsusta-hero-field-guide.jpg`,
  carbonOrbit: `${import.meta.env.BASE_URL}assets/envsusta-carbon-orbit.jpg`,
  learningAtlas: `${import.meta.env.BASE_URL}assets/envsusta-learning-atlas.jpg`,
  orbitMark: `${import.meta.env.BASE_URL}assets/envsusta-orbit-mark.png`,
};

export const envSustaAssets =
  import.meta.env.VITE_DEPLOY_TARGET === "github"
    ? repositoryAssets
    : managedAssets;
