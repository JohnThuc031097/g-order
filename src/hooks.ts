import { useEffect, useRef, useState } from "react";
import { matchStatusBarColor } from "utils/device";
import { useSnackbar } from "zmp-ui";
import { getUserInfo } from "zmp-sdk/apis";

export function useMatchStatusTextColor(visible?: boolean) {
    const changedRef = useRef(false);
    useEffect(() => {
        if (changedRef.current) {
            matchStatusBarColor(visible ?? false);
        } else {
            changedRef.current = true;
        }
    }, [visible]);
}

const originalScreenHeight = window.innerHeight;

export function useVirtualKeyboardVisible() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const detectKeyboardOpen = () => {
            setVisible(window.innerHeight + 160 < originalScreenHeight);
        };
        window.addEventListener("resize", detectKeyboardOpen);
        return () => {
            window.removeEventListener("resize", detectKeyboardOpen);
        };
    }, []);

    return visible;
}

export function useToBeImplemented() {
    const snackbar = useSnackbar();
    return () => {
        const getUser = (async () => {
            try {
                const { userInfo } = await getUserInfo({});
                snackbar.openSnackbar({
                    type: "success",
                    text: userInfo.id + " - " + userInfo.name,
                });
            } catch (error) {
                // xử lý khi gọi api thất bại      
                console.log(error);
                snackbar.openSnackbar({
                    type: "error",
                    text: error + "",
                });
            }
        })();
        // snackbar.openSnackbar({
        //   type: "success",
        //   text: "Chức năng dành cho các bên tích hợp phát triển...",
        // });
    }
}
