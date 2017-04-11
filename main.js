'use strict';

/* Helper components */
Vue.component('email', {
    props: ['data'],
    computed: {
        href_data: function() { return 'mailto:' + this.data; }
    },
    template: `
        <div>
        <svg xmlns="http://www.w3.org/2000/svg"> 
        <use xlink:href="icons.svg#email"></use>
        </svg>
        <a :href=this.href_data>{{ data }}</a>
        </div>
    `
});

Vue.component('website', {
    props: ['data'],
    // TODO: trim protocol prefixes
    computed: {
        link: function() {
            return this.data.replace(/http[s]*:\/\//i, '').replace(/w{3}\./i, '');
        }
    },
    template: `
        <div>
        <svg xmlns="http://www.w3.org/2000/svg"> 
        <use xlink:href="icons.svg#link"></use>
        </svg>
        <a :href=data>{{ link }}</a>
        </div>
    `
});

Vue.component('location', {
    props: ['data'],
    template: `
        <div>
        <svg xmlns="http://www.w3.org/2000/svg"> 
        <use xlink:href="icons.svg#location"></use>
        </svg>
        <span>{{ data }}</span>
        </div>
    `
});

Vue.component('github', {
    props: ['data'],
    computed: {
        href_data: function() { return 'https://github.com/' + this.data + '/'; }
    },
    template: `
        <span>
        <svg xmlns="http://www.w3.org/2000/svg"> 
        <use xlink:href="icons.svg#github"></use>
        </svg>
        <a :href=this.href_data>{{ data }}</a>
        </span>
    `
});

Vue.component('linkedin', {
    props: ['data'],
    computed: {
        href_data: function() { return 'https://www.linkedin.com/in/' + this.data + '/'; }
    },
    template: `
        <div>
        <svg xmlns="http://www.w3.org/2000/svg"> 
        <use xlink:href="icons.svg#linkedin"></use>
        </svg>
        <a :href=this.href_data>{{ data }}</a>
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
        <svg xmlns="http://www.w3.org/2000/svg"> 
        <use xlink:href="icons.svg#phone"></use>
        </svg>
        <a :href=this.href_data>&#43;{{ this.formatted }}</a>
        </div>
    `
});

Vue.component('languages', {
    props: ['items'],
    template: `
        <div>
        <svg xmlns="http://www.w3.org/2000/svg"> 
        <use xlink:href="icons.svg#code"></use>
        </svg>
        <comma-separated-list v-bind:items="items"></comma-separated-list>
        </div>
    `
});

Vue.component('tools', {
    props: ['items'],
    template: `
        <div>
        <svg xmlns="http://www.w3.org/2000/svg"> 
        <use xlink:href="icons.svg#tools"></use>
        </svg>
        <comma-separated-list v-bind:items="items"></comma-separated-list>
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
                return months[d.getMonth()] + '.' + d.getFullYear();
            }

            function date_eqaul (a,b) {
                if (typeof a !== typeof b) {
                    return false;
                }
                return a.getMonth() === b.getMonth() && a.getFullYear() === b.getFullYear();
            }

            if ( !this.from ) {
                return 'Present';
            }
            else if ( date_eqaul(this.from, this.to) ) {
                return process_date(this.from);
            }
            else if ( !this.to ) {
                return process_date(this.from) + ' - ' + 'present';
            }
            else {
                return process_date(this.from) + ' - ' + process_date(this.to);
            }
        }
    },
    template: `
        <div>
        <svg xmlns="http://www.w3.org/2000/svg"> 
        <use xlink:href="icons.svg#calendar"></use>
        </svg>
        <span>{{ date_range_string }}</span>
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
    <github v-bind:data=header_details.github></github>
    <website v-bind:data=header_details.website></website>
    <linkedin v-bind:data=header_details.linkedin></linkedin>
    <email v-bind:data=header_details.email></email>
    <phone v-bind:data=header_details.phone></phone>
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
    <span>
    {{ comma_list }}
    </span>
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
    <github v-else-if="section_details.github" v-bind:data="section_details.github"></github>
    <location v-if="section_details.location" v-bind:data="section_details.location"></location>
    <date-ranges 
    v-if="section_details.date_from" 
    v-bind:from="section_details.date_from" 
    v-bind:to="section_details.date_to"></date-ranges>
    <languages v-if="section_details.languages" v-bind:items="section_details.languages"></languages>
    <tools v-if="section_details.tools" v-bind:items="section_details.tools"></tools>
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

/* Simple section w/o extra data*/
Vue.component('simple-section', {
    props: ['section_name', 'data'],
    computed: {
        flatten_data: function() {
            if ( typeof this.data !== typeof [] ) {
                return [this.data];
            }
            return this.data;
        }
    },
    template: `
    <div v-if="flatten_data" class="section">
    <h2>{{ section_name }}</h2>

    <div class="section_content">
    <div class="inner_content">
    <list v-bind:items="flatten_data"></list>
    </div>
    </div>

    </div>
    `
});


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

// Mount Education
var education = new Vue({
    el: '#education',
    data: {
        section_name: 'Education', 
        data: data.education_description
    }
});
