import {
  getContactById,
  listContacts,
  removeContact,
  addContact,
} from "./contacts.js";

import "colors";

import { Command } from "commander";

const program = new Command();

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      listContacts().then(console.table);
      break;

    case "get":
      getContactById(id).then(console.table);
      break;

    case "add":
      addContact({ name, email, phone }).then(console.table);
      break;

    case "remove":
      removeContact(id).then(console.table);
      break;

    case "help":
      console.table([
        {
          options: "-a, --action <type>",
          description: "Choose type of action",
        },
        {
          options: "-i, --id <type>",
          description: "Set id",
        },
        {
          options: "-n, --name <type>",
          description: "Set name",
        },
        {
          options: "-e, --email <type>",
          description: "Set email",
        },
        {
          options: "-p, --phone <type>",
          description: "Set phone",
        },
      ]);
      console.table([
        {
          action: "list",
          description: "log and return contacts list",
        },
        {
          action: "get",
          description: "log and return contact by id [id is important]",
        },
        {
          action: "add",
          description:
            "log new contact and return it [name, pgone, email - are important]",
        },
        {
          action: "remove",
          description: "log removed contact and return it [id is important]",
        },
        {
          action: "help",
          description: "log help",
        },
      ]);

      console.log("\n");
      console.log(`node <file> --action="list"\n`);
      console.log(`node <file> --action="get" --id rsKkOQUi80UsgVPCcLZZW\n`);
      console.log(`node <file> --action="remove" --id rsKkOQUi80UsgVPCcLZZW\n`);
      console.log(
        `node <file> --action="add" --name "Alec Howard" --phone "(748) 206-2688" --email "nec@Nulla.com"\n`
      );
      break;

    default:
      console.warn("Unknown action type!".red);
  }
}

invokeAction(argv);
