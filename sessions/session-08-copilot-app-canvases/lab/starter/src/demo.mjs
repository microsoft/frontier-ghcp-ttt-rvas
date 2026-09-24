import { copyFile, readFile, writeFile } from "node:fs/promises";
import { addEvidence, updateStatus } from "./canvas-contract.mjs";

const preparedUrl = new URL("../prepared-items.json", import.meta.url);
const workingUrl = new URL("../working-state.json", import.meta.url);
const [command, id, value] = process.argv.slice(2);

async function loadWorkingState() {
  try {
    return JSON.parse(await readFile(workingUrl, "utf8"));
  } catch (error) {
    if (error.code === "ENOENT") {
      throw new Error("working state is missing; run `node src/demo.mjs init`");
    }
    throw error;
  }
}

try {
  if (command === "init") {
    await copyFile(preparedUrl, workingUrl);
    console.log("Initialized working-state.json");
  } else if (command === "show") {
    console.log(JSON.stringify(await loadWorkingState(), null, 2));
  } else if (command === "status" || command === "evidence") {
    const items = await loadWorkingState();
    if (command === "status") {
      updateStatus(items, id, value);
    } else {
      addEvidence(items, id, value);
    }
    await writeFile(workingUrl, `${JSON.stringify(items, null, 2)}\n`);
    console.log(JSON.stringify(items, null, 2));
  } else {
    throw new Error(
      "use init, show, status <id> <status>, or evidence <id> <value>",
    );
  }
} catch (error) {
  console.error(`Rejected: ${error.message}`);
  process.exitCode = 1;
}
