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
    props: ['header_details'],
    template: `
    <div>
    <h1>{{ header_details.name }}</h1> 
    <div class="contact_info">
    <email v-bind:data=header_details.email></email>
    <github v-bind:data=header_details.github></github>
    <phone v-bind:data=header_details.phone></phone>
    <website v-bind:data=header_details.website></website>
    </div>
    </div>
    `
});

var header = new Vue({
    el: '#header',
    data: {
        header_details: data.header
    }
});

/* End header */


/* Section item */
Vue.component('section-item', {
    props: ['section_details'],
    template: `
    <div>{{ section_details }}</div>
    `
});
/* End section item */


/* Work experience */

// Mounting point of work experience section
Vue.component('work-experience-section', {
    props: ['items'],
    template: `
    <div class="section">
    <h2>Work Experience</h2>
    <section-item v-for="item in items" v-bind:section_details="item"></section-item>
    </div>
    `
});

var work_experience = new Vue({
    el: '#work_experience_section',
    data: { 
        data:['hello','world']
    }
});
/* End work experience */
