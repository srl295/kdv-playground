import Image from "next/image";
import styles from "./page.module.css";

import * as km from "@keymanapp/common-types";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <ol>
          <li>Firstly</li>
          <li>Secondly</li>
        </ol>

        <div className={styles.ctas}>
          <p>Hello {km.CommonTypesMessages.Error_InvalidXml({e: 'Hi'}).message}</p>
        </div>
      </main>
      <footer className={styles.footer}>
        <i>Made with typing on keys</i>
      </footer>
    </div>
  );
}
