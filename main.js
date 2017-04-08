'use strict';

/* Header + contact info components */
Vue.component('email', {
    props: ['data'],
    computed: {
        href_data: function() { return 'mailto:' + this.data; }
    },
    template: `
        <div>
        <a :href=this.href_data>{{ data }}</a>
        </div>
    `
});

Vue.component('website', {
    props: ['data'],
    template: `
        <div>
        <a :href=data>{{ data }}</a>
        </div>
    `
});

Vue.component('github', {
    props: ['data'],
    computed: {
        href_data: function() { return 'https://github.com/' + this.data + '/'; }
    },
    template: `
        <div>
        <a :href=this.href_data>github.com&#47;{{ data }}</a>
        </div>
    `
});

Vue.component('phone', {
    props: ['data'],
    computed: {
        href_data: function() { return 'tel:+' + this.data.join(''); },
        formatted: function() { return this.data.join('-'); }
    },
    template: `
        <div>
        <a :href=this.href_data>&#43;{{ this.formatted }}</a>
        </div>
    `
});


Vue.component('header-info', {
    props: ['name', 'email', 'github', 'phone', 'website'],
    template: `
    <div>
    <h1>{{ name }}</h1> 
    <div class="contact_info">
    <email v-bind:data=email></email>
    <github v-bind:data=github></github>
    <phone v-bind:data=phone></phone>
    <website v-bind:data=website></website>
    </div>
    </div>
    `
});

var header = new Vue({
    el: '#header',
    data: data
});

/* End header */
