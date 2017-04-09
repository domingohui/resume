'use strict';

/* Helper components */
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
    // TODO: trim protocol prefixes
    template: `
        <div>
        <a :href=data>{{ data }}</a>
        </div>
    `
});

Vue.component('location', {
    props: ['data'],
    template: `
        <div>
        {{ data }}
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

Vue.component('date-ranges', {
    props: ['from', 'to'],
    computed: {
        date_range_string: function () {
            let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            function process_date (d) {
                return months[d.getMonth()-1] + '.' + d.getFullYear();
            }
            
            if ( !this.to ) {
                return process_date(this.from) + ' - ' + 'present';
            }
            else {
                return process_date(this.from) + ' - ' + process_date(this.to);
            }
        }
    },
    template: `
    <div>
    {{ date_range_string }}
    </div>
    `
});

/* End Helper components */

/* Header wrapper */

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

// Mount header
var header = new Vue({
    el: '#header',
    data: {
        header_details: data.header
    }
});

/* End header wrapper */


/* Section item */

Vue.component('list', {
    props: ['items'],
    template:`
    <ul>

    <li v-for="i in items">
    <span>{{ i }}</span>
    </li>

    </ul>
    `
});

Vue.component('comma-separated-list', {
    props: ['items'],
    computed: {
        comma_list: function() {
            return this.items.join(', ');
        }
    },
    template:`
    <div>
    {{ comma_list }}
    </div>
    `
});

Vue.component('section-item', {
    props: ['section_details'],
    template: `
    <div class="subsection">

    <!--Header-->
    <div class="subsection_header">
    <h3>{{ section_details.name }}</h3>
    <div class="header_info">{{ section_details.role || 'Internship' }}</div>
    </div>

    <!--Description-->
    <div class="inner_content">
    <list v-bind:items="section_details.description"></list>
    </div>

    <!--Extra info on the right-->
    <div class="right_info">
    <website v-if="section_details.link" v-bind:data="section_details.link"></website>
    <location v-if="section_details.location" v-bind:data="section_details.location"></location>
    <date-ranges 
    v-if="section_details.date_from" 
    v-bind:from="section_details.date_from" 
    v-bind:to="section_details.to"></date-ranges>
    <comma-separated-list v-if="section_details.languages" v-bind:items="section_details.languages"></comma-separated-list>
    <comma-separated-list v-if="section_details.tools" v-bind:items="section_details.tools"></comma-separated-list>
    </div>

    </div>
    `
});
/* End section item */


/* Section wrapper - displays a list of section-items */
Vue.component('section-wrapper', {
    props: ['section_name', 'data'],
    computed: {
        sorted: function() {
            let sort_by_key = this.data.sort_by_key || 'name';
            return this.data.data.sort((a,b) => {
                return a[sort_by_key] < b[sort_by_key];
            });
        }
    },
    template: `
    <div v-if="data" class="section">
    <h2>{{ section_name }}</h2>
    <div class="section_content">
    <section-item v-for="item in sorted" v-bind:section_details="item"></section-item>
    </div>
    </div>
    `
});

/* End section */

// Mount a section list for work experience items
var work_experience = new Vue({
    el: '#work_experience_section',
    data: { 
        section_name: 'Work Experience', 
        data: data.work_experience_items
    }
});

// Mount projects..
var projects = new Vue({
    el: '#project_section',
    data: { 
        section_name: 'Projects', 
        data: data.project_items
    }
});
