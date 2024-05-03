import { Button } from "@mui/material";
import Layout from "../../../components/layout/Layout";
import CheckIcon from "@mui/icons-material/Check";
import { useMutation } from "@apollo/client";
import { useSelector } from "react-redux";
import { paymentQuery } from "../../../Query/planQuery";
import toast from "react-hot-toast";
import { useRouter } from "next/router";

export default function Subscription() {
  const [payment] = useMutation(paymentQuery);
  const { user } = useSelector((state) => state.user);
  const { isLogin } = useSelector((state) => state.user);
  const router = useRouter();
  const handlePayment = async (price) => {
    if (isLogin) {
      const { data } = await payment({
        variables: {
          price,
          userId: user?.id,
        },
      });
      if (data) {
        window.open(data.createSubscription, "_blank");
      }
    } else {
      toast.error("Please login for Add Subscription");
      router.push("/login");
    }
  };
  return (
    <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 min-h-screen text-gray-300 pb-56">
      <Layout>
        <div className=" flex justify-center items-center">
          <div className="flex   justify-center items-center mt-32">
            <div className="border-2 w-80 mr-5 h-[425px] rounded-3xl p-4 flex flex-col items-center bg-gray-900">
              <h3 class="mb-4 text-2xl font-semibold">Basic</h3>
              <div class="flex justify-center items-baseline my-8">
                <span class="mr-2 text-5xl font-extrabold">€3</span>
                {/* <span class="text-gray-500 dark:text-gray-400">/month</span> */}
              </div>
              <ul role="list" class="mb-8 space-y-4 text-left">
                <li class="flex items-center space-x-3">
                  <CheckIcon color="success" />

                  <span>Access for 1 month</span>
                </li>
                <li class="flex items-center space-x-3">
                  <CheckIcon color="success" />

                  <span>Downlaod songs</span>
                </li>
                <li class="flex items-center space-x-3">
                  <CheckIcon color="success" />

                  <span>Create your playlist</span>
                </li>
                <li class="flex items-center space-x-3">
                  <CheckIcon color="success" />

                  <span>Follow your favorite artist</span>
                </li>
              </ul>
              <button
                type="button"
                onClick={() => handlePayment(3)}
                class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              >
                Get Started
              </button>
            </div>
            <div className="border-2 w-80 mr-5 h-[425px] rounded-3xl p-4 flex flex-col items-center bg-gray-900">
              <h3 class="mb-4 text-2xl font-semibold">Standard</h3>
              <div class="flex justify-center items-baseline my-8">
                <span class="mr-2 text-5xl font-extrabold">€8</span>
              </div>
              <ul role="list" class="mb-8 space-y-4 text-left">
                <li class="flex items-center space-x-3">
                  <CheckIcon color="success" />

                  <span>Access for 3 month</span>
                </li>
                <li class="flex items-center space-x-3">
                  <CheckIcon color="success" />

                  <span>Downlaod songs</span>
                </li>
                <li class="flex items-center space-x-3">
                  <CheckIcon color="success" />

                  <span>Create your playlist</span>
                </li>
                <li class="flex items-center space-x-3">
                  <CheckIcon color="success" />

                  <span>Follow your favorite artist</span>
                </li>
              </ul>
              <button
                type="button"
                onClick={() => handlePayment(8)}
                class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              >
                Get Started
              </button>
            </div>
            <div className="border-2 w-80 mr-5 h-[425px] rounded-3xl p-4 flex flex-col items-center bg-gray-900">
              <h3 class="mb-4 text-2xl font-semibold">Premium</h3>
              <div class="flex justify-center items-baseline my-8">
                <span class="mr-2 text-5xl font-extrabold">€29</span>
              </div>
              <ul role="list" class="mb-8 space-y-4 text-left">
                <li class="flex items-center space-x-3">
                  <CheckIcon color="success" />

                  <span>Access for 12 month</span>
                </li>
                <li class="flex items-center space-x-3">
                  <CheckIcon color="success" />

                  <span>Downlaod songs</span>
                </li>
                <li class="flex items-center space-x-3">
                  <CheckIcon color="success" />

                  <span>Create your playlist</span>
                </li>
                <li class="flex items-center space-x-3">
                  <CheckIcon color="success" />

                  <span>Follow your favorite artist</span>
                </li>
              </ul>
              <button
                type="button"
                onClick={() => handlePayment(29)}
                class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
}
