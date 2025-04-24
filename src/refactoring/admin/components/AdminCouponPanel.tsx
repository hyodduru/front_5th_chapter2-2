import AdminCouponForm from "./AdminCouponForm";
import AdminCouponList from "./AdminCouponList";
import { Coupon } from "../../../types.ts";
import { useAdminCoupon } from "../hooks/useAdminCoupon.tsx";

interface AdminCouponPanelProps {
  onCouponAdd: (newCoupon: Coupon) => void;
  coupons: Coupon[];
}

const AdminCouponPanel = ({ onCouponAdd, coupons }: AdminCouponPanelProps) => {
  const { newCoupon, handleNewCouponFieldChange, handleAddCoupon } =
    useAdminCoupon({
      onCouponAdd
    });

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">쿠폰 관리</h2>
      <div className="bg-white p-4 rounded shadow">
        <AdminCouponForm
          newCoupon={newCoupon}
          handleAddCoupon={handleAddCoupon}
          handleNewCouponFieldChange={handleNewCouponFieldChange}
        />
        <AdminCouponList coupons={coupons} />
      </div>
    </div>
  );
};

export default AdminCouponPanel;
