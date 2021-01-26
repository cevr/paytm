import * as React from "react";
import { AppBar, Button, Toolbar, Typography } from "@material-ui/core";
import { Theme, makeStyles, createStyles } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";

import { useStore } from "./store";
import ReceiptForm from "./components/ReceiptForm";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      height: "100%",
    },
    main: {
      height: "calc(100% - 64px)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      padding: theme.spacing(3),
    },
    receiptContainer: {
      display: "flex",
      flexWrap: "wrap",
      gap: `${theme.spacing(5)}px`,
      marginBottom: theme.spacing(2),
    },
    errorText: {
      color: red[500],
    },
    submitContainer: {
      display: "flex",
      width: "100%",
      justifyContent: "flex-end",
      marginTop: theme.spacing(4),
    },
  });

const useStyles = makeStyles(styles);

function App() {
  const styles = useStyles();
  const receipts = useStore((state) => Object.values(state.receipts));
  const addReceipt = useStore((state) => state.addReceipt);
  const total = React.useMemo(
    () =>
      parseFloat(
        receipts
          .reduce((total, receipt) => {
            return total + receipt.amountCAD;
          }, 0)
          .toFixed(2)
      ),
    [receipts]
  );
  const totalHasExceededLimit = total > 1000;

  return (
    <div className={styles.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" noWrap>
            Expensr
          </Typography>
        </Toolbar>
      </AppBar>
      <main className={styles.main}>
        <div className={styles.receiptContainer}>
          {receipts.map((receipt, index) => (
            <ReceiptForm key={receipt.id} receipt={receipt} index={index} />
          ))}
        </div>
        <Button
          variant="contained"
          color="primary"
          disabled={receipts.length === 5}
          onClick={() => {
            addReceipt();
          }}
        >
          Add Receipt
        </Button>
        <Typography>Total: {total} CAD</Typography>

        <div className={styles.submitContainer}>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              const report = {
                total,
                receipts: Object.values(receipts),
              };
              console.log({ report });
            }}
            disabled={totalHasExceededLimit}
          >
            Submit report
          </Button>
        </div>
        {totalHasExceededLimit && (
          <Typography className={styles.errorText}>
            Your total has exceeded the limit. The limit is $1000 CAD. Please
            review your receipts.
          </Typography>
        )}
      </main>
    </div>
  );
}

export default App;
