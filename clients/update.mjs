#!/usr/bin/env bun
import { writeFile, readFile } from "fs/promises";
import path from "node:path";
import { $ } from "bun";

const SCOPE = "@workspace";
const VERSION = "0.0.1";

// Get API Gateway URL from environment variable
const API_GATEWAY_URL = process.env.NEXT_PUBLIC_API_GATEWAY_URL || "https://n8ik.uln.me";

console.log(`🚀 Using API Gateway URL: ${API_GATEWAY_URL}`);

// Read the template and replace placeholders
const templatePath = path.join("clients", "clients.template.json");
const templateContent = await readFile(templatePath, "utf-8");
const clientsConfig = JSON.parse(templateContent.replace(/\{\{API_GATEWAY_URL\}\}/g, API_GATEWAY_URL));

console.log(`📝 Using clients config with API Gateway: ${API_GATEWAY_URL}`);

// Generate clients for each service
for (const { name, clients } of clientsConfig) {
    for (const { environment, openapi, basePath } of clients) {
        console.log(openapi, basePath);
        const outDir = path.join("clients", name, environment);

        try {
            // Ensure output directory exists
            await $`mkdir -p ${outDir}`;

            await $`docker run --rm \
            -v ${process.cwd()}:/local \
            openapitools/openapi-generator-cli:latest \
            generate \
            -g typescript-axios \
            -i ${openapi} \
            -o /local/${outDir} \
            --skip-validate-spec \
            --log-to-stderr 2>/dev/null`;

            await $`sudo chown -R $UID:$GID ${outDir}`;

            console.log(`🔨 Openapi client "${name}" for "${environment}" generated`);
        } catch (err) {
            console.error(`❌ Could not generate Openapi client "${name}" for "${environment}":`, err);
        }

        // Patch base.ts BASE_PATH
        const baseTsPath = path.join(outDir, "base.ts");
        try {
            let baseTs = await Bun.file(baseTsPath).text();
            baseTs = baseTs.replace(
                /export const BASE_PATH = [^;]+;/,
                `export const BASE_PATH = "${basePath}".replace(/\\/+$/, "");`
            );
            await Bun.write(baseTsPath, baseTs);
            console.log(`🛠️  Patched BASE_PATH in base.ts for "${name}" for "${environment}"`);
        } catch (err) {
            console.warn(`⚠️  Could not patch BASE_PATH in base.ts for "${name}" for "${environment}":`, err);
        }

        await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    // write / refresh package.json
    const pkgJson = {
        name: `${SCOPE}/${name}`,
        version: VERSION,
        private: true,
        type: "module",
        main: "index.ts",
        exports: {
            ".": "./production/index.ts",
            "./development": "./development/index.ts",
            "./production": "./production/index.ts",
        },
        dependencies: {
            axios: "catalog:api",
        },
    };

    try {
        // Ensure package.json directory exists
        await $`mkdir -p clients/${name}`;
        await writeFile(path.join("clients", name, "package.json"), JSON.stringify(pkgJson, null, 2));
        console.log(`📦 package.json written for "${name}"`);
    } catch (err) {
        console.warn(`⚠️  Could not write package.json for "${name}":`, err);
    }
}

console.log(`✅ All clients generated successfully with API Gateway: ${API_GATEWAY_URL}`);
