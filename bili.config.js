// bili.config.js
const namePath = 'index';

const config = {
    input: 'src/index.js',
    output: {
        format: ['cjs', 'umd', 'umd-min', 'esm'],
        moduleName: 'featureFilter',
        sourceMap: true,
    },
    extendConfig(config, { format }) {
        if (format.startsWith('umd')) {
            config.output.fileName = `${namePath}[min].js`;
        }
        if (format === 'esm') {
            config.output.fileName = `${namePath}.esm.js`;
        }
        if (format === 'cjs') {
            config.output.fileName = `${namePath}.cjs.js`;
        }

        config.externals = [];

        return config;
    },
    extendRollupConfig: (config) => {
        return config;
    },
};

export default config;
