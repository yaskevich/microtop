import { reactive } from 'vue';
import project from '../package.json';
import bibliography from './bibliography.json';
import beladmdiv from '../data/beladmdiv.json';
import topos from '../data/districts-topo.json'
import { feature as topofeature } from 'topojson-client';

const geofeatures = (<any>topofeature((topos as any), (topos.objects.GEO as any))).features;
const stats: ICounter = {};
const dict = new Map();
beladmdiv.map(x => dict.set(x.name_be, x.id) && dict.set(x.id, x.name_be))

const git = project?.repository?.url ? 'https' + project.repository.url.slice(3, -4) : '';

const options = reactive([] as Array<ICascadeItem>);

for (let item of bibliography) {
    // console.log(item.region, item.district);
    stats?.[item.district] ? stats[item.district] += 1 : stats[item.district] = 1;

    const node = options.filter(x => x.name === item.region);
    if (node.length) {
        const child = node[0]['children'];
        if (!child.filter(x => x.name === item.district).length) {
            child.push({ name: item.district, level: 3, label: `${item.district} раён` } as ICascadeChild);
        }
    } else {
        options.push({
            name: item.region,
            level: 2,
            label: `${item.region} вобласць`,
            children: [{ name: item.region, level: 2, parent: true, label: `${item.region} вобласць`, }, { name: item.district, level: 3, label: `${item.district} раён` } as ICascadeChild],
        } as ICascadeItem);
    }
}

for (let item of options.sort((a, b) => a.name.localeCompare(b.name)) as Array<ICascadeItem>) {
    const header = item.children.shift() as ICascadeChild;
    item.children.sort((a, b) => a.name.localeCompare(b.name));
    item.children.unshift(header);
}

for (let geo of geofeatures) {
    const properties = geo.properties;
    const name = dict.get(geo.properties.id)
    geo.properties = { ...properties, pubs: stats[name], name };
}

export default {
    version: project?.version,
    git,
    bibliography,
    options,
    geofeatures,
};
