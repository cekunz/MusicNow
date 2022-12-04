<!-- Form for adding/removing song from favorites -->

<template>
    <div v-if="!favorited">
        <button class='favButton'
        v-if="!favorited"
        @click="addFavorite"  
        >
        &#128420;
        </button> 
    </div>
    <div v-if="favorited">
        <button class='favButton'
        v-if="favorited"
        @click="removeFavorite"  
        >
        &#10084;
        </button> 
    </div>
</template>
    
<script>

import store from '@/store.ts';

export default {
    name: 'AddFavoriteForm',
    props: {
        song: {
            type: Object,
            required: true
        }
    },
    data() {
    return {
        alerts: {} // Displays success/error messages encountered during freet modification
    };
    },
    computed {
        favorited() {
            await store.refreshFavorites();
            return store.favorites.map(favorite => favorite.song.trackId).includes(song.trackId);
        }
    },
    methods: {
    async addFavorite() {
        /**
         * Submits a request to the favorite's endpoint
         * @param params - Options for the request
         * @param params.body - Body for the request, if it exists
         * @param params.callback - Function to run if the the request succeeds
         */
        const params = {
        url: `/api/favorite/:${store.state.username}?trackId=${song.trackId}`,
        method: 'POST',
        message: 'Successfully added song to favorites!',
        callback: () => {
            this.$set(this.alerts, params.message, 'success');
            setTimeout(() => this.$delete(this.alerts, params.message), 3000);
        }
        };
        this.sendRequest(params);
        this.favorited = true;
    },
    async removeFavorite() {
        /**
         * Submits a request to the favorite's endpoint
         * @param params - Options for the request
         * @param params.body - Body for the request, if it exists
         * @param params.callback - Function to run if the the request succeeds
         */
        const params = {
        url: `/api/favorite/:${store.state.username}?trackId=${song.trackId}`,
        method: 'DELETE',
        message: 'Successfully removed song from favorites!',
        callback: () => {
            this.$set(this.alerts, params.message, 'success');
            setTimeout(() => this.$delete(this.alerts, params.message), 3000);
        }
        };
        this.sendRequest(params);
        this.favorited = false;
    },
    async sendRequest(params) {
        /**
         * Submits a request to the favorite's endpoint
         * @param params - Options for the request
         * @param params.body - Body for the request, if it exists
         * @param params.callback - Function to run if the the request succeeds
         */
        const options = {
        method: params.method, headers: {'Content-Type': 'application/json'}
        };
        if (params.body) {
        options.body = params.body;
        }

        try {
        const r = await fetch(params.url, options);
        if (!r.ok) {
            const res = await r.json();
            throw new Error(res.error);
        }

        this.editing = false;
        const returned = await r.json();

        params.callback();
        } catch (e) {
        this.$set(this.alerts, e, 'error');
        setTimeout(() => this.$delete(this.alerts, e), 3000);
        }
    }
    }
};
</script>

<style scoped>

.favButton {
    font-size: 15px;
    padding: 25px;
    margin: 5px;
    border: solid 2px rgb(192, 192, 192);
    border-radius: 1px;
    width: 100%;
}

button:hover {
    background-color: rgb(84, 84, 84);
    color: white;
    border-color: rgb(54, 54, 54);
}
</style>