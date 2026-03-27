import React, {useState} from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Modal,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from 'react-native';
import AppBackground from '../../../components/AppBackground';
import CustomText from '../../../components/CustomText';
import CustomButton from '../../../components/CustomButton';
import {useFetchReceiptByIdQuery, useApproveReceiptMutation, useRejectReceiptMutation} from '../../../Api/receiptApiSlice';
import {useFetchPointRuleQuery} from '../../../Api/pointRuleApiSlice';
import ActivityLoader from '../../../components/ActivityLoader';
import {colors} from '../../../utils/Colors';
import {colors2} from '../../../theme/colors2';
import NavService from '../../../helpers/NavService';
import {executeApiRequest} from '../../../Api/methods/method';
import {getImageUrl} from '../../../utils/helperFunction';
import styles from './styles';

const formatDate = dateStr => {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  const months = 'Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec'.split(' ');
  return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
};

const ReceiptDetail = ({route}) => {
  const receiptId = route?.params?.receiptId;
  const [rejectModalVisible, setRejectModalVisible] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  const [approveModalVisible, setApproveModalVisible] = useState(false);
  const [pointsAwarded, setPointsAwarded] = useState('');

  const {data: receipt, isLoading, refetch} = useFetchReceiptByIdQuery(receiptId, {skip: !receiptId});
  const {data: pointRule} = useFetchPointRuleQuery(undefined, {skip: !receiptId});
  const [approveReceipt, {isLoading: isApproving}] = useApproveReceiptMutation();
  const [rejectReceipt, {isLoading: isRejecting}] = useRejectReceiptMutation();

  const hasActivePerSpendRule = pointRule?.rule_type === 'per_spend' && pointRule?.is_active;
  const needsPointsInput = !hasActivePerSpendRule;

  const getPointsAwardedForApprove = () => {
    if (hasActivePerSpendRule && pointRule?.spend_threshold > 0 && pointRule?.points_per_unit != null) {
      const amount = Number(receipt?.amount) || 0;
      return Math.floor(amount / pointRule.spend_threshold) * pointRule.points_per_unit;
    }
    return null;
  };

  const handleApprovePress = () => {
    if (needsPointsInput) {
      setPointsAwarded('');
      setApproveModalVisible(true);
    } else {
      handleApproveSubmit();
    }
  };

  const handleApproveSubmit = async (points) => {
    let pointsToSend = null;
    if (hasActivePerSpendRule) {
      pointsToSend = getPointsAwardedForApprove();
    } else if (points != null || pointsAwarded !== '') {
      pointsToSend = Number(points ?? pointsAwarded) || 0;
    }
    if (pointsToSend == null || pointsToSend < 0) {
      if (needsPointsInput) return;
      pointsToSend = 0;
    }
    const body = { points_awarded: pointsToSend };
    await executeApiRequest({
      apiCallFunction: () => approveReceipt({ receiptId, body }),
      toast: true,
    });
    setApproveModalVisible(false);
    setPointsAwarded('');
    refetch();
  };

  const handleRejectOpen = () => setRejectModalVisible(true);
  const handleRejectSubmit = async () => {
    const reason = rejectionReason?.trim();
    if (!reason) return;
    await executeApiRequest({
      apiCallFunction: () => rejectReceipt({ receiptId, body: { rejection_reason: reason } }),
      toast: true,
    });
    setRejectModalVisible(false);
    setRejectionReason('');
    refetch();
  };

  if (!receiptId) {
    return (
      <AppBackground back title="Receipt Detail">
        <CustomText text="No receipt selected" style={styles.metaText} />
      </AppBackground>
    );
  }

  if (isLoading || !receipt) {
    return (
      <AppBackground back title="Receipt Detail">
        <ActivityLoader color={colors2?.theme?.secondary} />
      </AppBackground>
    );
  }

  const userName = receipt.user_id?.fullName || receipt.user_id?.email || '—';
  const userEmail = receipt.user_id?.email || '—';
  const isPending = receipt.status === 'pending';

  return (
    <AppBackground back title="Receipt Detail">
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <Image
            source={getImageUrl(receipt.receipt_image_url)}
            style={styles.receiptImage}
            resizeMode="contain"
          />
          <View style={styles.fieldRow}>
            <CustomText text="Business" style={styles.label} />
            <CustomText text={receipt.extracted_business_name || '—'} style={styles.value} />
          </View>
          <View style={styles.fieldRow}>
            <CustomText text="Customer" style={styles.label} />
            <CustomText text={userName} style={styles.value} />
          </View>
          <View style={styles.fieldRow}>
            <CustomText text="Email" style={styles.label} />
            <CustomText text={userEmail} style={styles.value} numberOfLines={1} />
          </View>
          <View style={styles.fieldRow}>
            <CustomText text="Amount" style={styles.label} />
            <CustomText text={`$${receipt.amount ?? '0'}`} style={styles.amount} />
          </View>
          <View style={styles.fieldRow}>
            <CustomText text="Receipt date" style={styles.label} />
            <CustomText text={formatDate(receipt.receipt_date)} style={styles.value} />
          </View>
          <View style={styles.fieldRow}>
            <CustomText text="Status" style={styles.label} />
            <View style={[styles.statusBadge, receipt.status === 'approved' && styles.statusApproved, receipt.status === 'rejected' && styles.statusRejected]}>
              <CustomText text={receipt.status} style={styles.statusText} />
            </View>
          </View>
          {receipt.status === 'rejected' && receipt.rejection_reason ? (
            <View style={styles.fieldRow}>
              <CustomText text="Rejection reason" style={styles.label} />
              <CustomText text={receipt.rejection_reason} style={styles.value} />
            </View>
          ) : null}
        </View>

        {isPending && (
          <View style={styles.actions}>
            {isApproving ? (
              <ActivityLoader color={colors2?.theme?.secondary} />
            ) : (
              <CustomButton
                gradientColorArr={[colors.green, colors.green]}
                title="Approve"
                onPress={handleApprovePress}
                buttonStyle={styles.btnApprove}
                textStyle={styles.btnText}
              />
            )}
            {isRejecting ? (
              <ActivityLoader color={colors2?.theme?.secondary} />
            ) : (
              <CustomButton
                gradientColorArr={[colors.red, colors.red]}
                title="Reject"
                onPress={handleRejectOpen}
                buttonStyle={styles.btnApprove}
                textStyle={styles.btnText}
              />
            )}
          </View>
        )}
      </ScrollView>

      <Modal visible={rejectModalVisible} transparent animationType="fade">
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setRejectModalVisible(false)}>
          <View style={styles.modalContent}>
            <CustomText text="Rejection reason (required)" style={styles.modalTitle} />
            <TextInput
              style={styles.reasonInput}
              placeholder="Enter reason"
              placeholderTextColor={colors.placeholderText}
              value={rejectionReason}
              onChangeText={setRejectionReason}
              multiline
            />
            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.modalBtnCancel} onPress={() => setRejectModalVisible(false)}>
                <CustomText text="Cancel" style={styles.modalCancelText} />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalBtnReject, !rejectionReason?.trim() && styles.modalBtnDisabled]}
                onPress={handleRejectSubmit}
                disabled={!rejectionReason?.trim()}>
                <CustomText text="Reject" style={styles.modalRejectBtnText} />
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>

      <Modal visible={approveModalVisible} transparent animationType="fade">
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.modalOverlay}>
          <TouchableOpacity
            style={StyleSheet.absoluteFill}
            activeOpacity={1}
            onPress={() => setApproveModalVisible(false)}
          />
          <View style={styles.modalContent}>
            <CustomText text="Points to award" style={styles.modalTitle} />
            <CustomText text="No active per-spend rule. Enter points to award." style={styles.modalHint} />
            <TextInput
              style={styles.reasonInput}
              placeholder="Points"
              placeholderTextColor={colors.placeholderText}
              value={pointsAwarded}
              onChangeText={setPointsAwarded}
              keyboardType="number-pad"
            />
            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.modalBtnCancel} onPress={() => setApproveModalVisible(false)}>
                <CustomText text="Cancel" style={styles.modalCancelText} />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalBtnApprove, (!pointsAwarded || Number(pointsAwarded) <= 0) && styles.modalBtnDisabled]}
                onPress={() => handleApproveSubmit()}
                disabled={!pointsAwarded || Number(pointsAwarded) <= 0}>
                <CustomText text="Approve" style={styles.modalApproveBtnText} />
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </AppBackground>
  );
};

export default ReceiptDetail;
