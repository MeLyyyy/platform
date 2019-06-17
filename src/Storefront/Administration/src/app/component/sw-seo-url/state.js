// Store
export default {
    namespaced: true,

    state() {
        return {
            seoUrlCollection: null,
            originalSeoUrls: [],
            defaultSeoUrl: null,
            currentSeoUrl: null,
            loading: false
        };
    },

    getters: {
        isLoading: (state) => {
            return state.loading;
        },
        getNewOrModifiedUrls: (state) => () => {
            const seoUrls = [];

            state.seoUrlCollection.forEach((seoUrl) => {
                const originalSeoUrl = state.originalSeoUrls.find((url) => {
                    return url.id === seoUrl.id;
                });

                if (originalSeoUrl && originalSeoUrl.seoPathInfo === seoUrl.seoPathInfo) {
                    return;
                }

                if (!originalSeoUrl && !seoUrl.seoPathInfo) {
                    return;
                }

                seoUrls.push(seoUrl);
            });

            return seoUrls;
        }
    },

    mutations: {
        setSeoUrlCollection(state, seoUrlCollection) {
            state.seoUrlCollection = seoUrlCollection;
        },

        setOriginalSeoUrls(state, originalSeoUrls) {
            state.originalSeoUrls = originalSeoUrls;
        },

        setCurrentSeoUrl(state, currentSeoUrl) {
            state.currentSeoUrl = currentSeoUrl;
        },

        setDefaultSeoUrl(state, defaultSeoUrl) {
            state.defaultSeoUrl = defaultSeoUrl;
        },

        setLoading(state, value) {
            state.loading = value;
        }
    },

    actions: {
        initState({ commit }, { seoUrlCollection, seoUrls }) {
            commit('setSeoUrlCollection', seoUrlCollection);
            commit('setOriginalSeoUrls', seoUrls);
        }
    }
};
