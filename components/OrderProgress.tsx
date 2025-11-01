// components/OrderProgress.tsx
import COLORS from '@/constants/colors';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export type OrderStep = 'confirm' | 'looking' | 'preparing' | 'delivering' | 'arrived';

interface OrderProgressProps {
  currentStep: OrderStep;
}

interface Step {
  id: OrderStep;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
}

const steps: Step[] = [
  { id: 'confirm', label: 'Confirm\norder', icon: 'checkmark-circle' },
  { id: 'looking', label: 'Look for\ndriver', icon: 'search' },
  { id: 'preparing', label: 'Prepare\nfood', icon: 'restaurant' },
  { id: 'delivering', label: 'Deliver', icon: 'bicycle' },
  { id: 'arrived', label: 'Arrived', icon: 'home' },
];

export default function OrderProgress({ currentStep }: OrderProgressProps) {
  const currentIndex = steps.findIndex((step) => step.id === currentStep);

  const getStepStatus = (index: number) => {
    if (index < currentIndex) return 'completed';
    if (index === currentIndex) return 'active';
    return 'inactive';
  };

  return (
    <View style={styles.container}>
      <View style={styles.progressBar}>
        {steps.map((step, index) => {
          const status = getStepStatus(index);
          const isLast = index === steps.length - 1;

          return (
            <React.Fragment key={step.id}>
              <View style={styles.stepContainer}>
                <View
                  style={[
                    styles.stepCircle,
                    status === 'completed' && styles.stepCompleted,
                    status === 'active' && styles.stepActive,
                  ]}
                >
                  {status === 'completed' ? (
                    <Ionicons name="checkmark" size={16} color="#fff" />
                  ) : (
                    <View
                      style={[
                        styles.stepDot,
                        status === 'active' && styles.stepDotActive,
                      ]}
                    />
                  )}
                </View>
                <Text
                  style={[
                    styles.stepLabel,
                    status !== 'inactive' && styles.stepLabelActive,
                  ]}
                >
                  {step.label}
                </Text>
              </View>

              {!isLast && (
                <View
                  style={[
                    styles.connector,
                    index < currentIndex && styles.connectorCompleted,
                  ]}
                />
              )}
            </React.Fragment>
          );
        })}
      </View>

      {currentStep === 'looking' && (
        <View style={styles.statusCard}>
          <View style={styles.iconContainer}>
            <Ionicons name="search" size={48} color={COLORS.primary} />
          </View>
          <Text style={styles.statusTitle}>Looking for driver</Text>
          <View style={styles.helpButtons}>
            <TouchableOpacity style={styles.helpButton}>
              <Text style={styles.helpButtonText}>Need help?</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton}>
              <Ionicons name="close" size={16} color={COLORS.textLight} />
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
  },
  progressBar: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  stepContainer: {
    alignItems: 'center',
    flex: 1,
  },
  stepCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.backgroundGray,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  stepCompleted: {
    backgroundColor: COLORS.primary,
  },
  stepActive: {
    backgroundColor: COLORS.primary,
    borderWidth: 4,
    borderColor: COLORS.primaryLight,
  },
  stepDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.textLight,
  },
  stepDotActive: {
    backgroundColor: '#fff',
  },
  stepLabel: {
    fontSize: 11,
    color: COLORS.textLight,
    textAlign: 'center',
    lineHeight: 14,
  },
  stepLabelActive: {
    color: COLORS.textPrimary,
    fontWeight: '600',
  },
  connector: {
    position: 'absolute',
    top: 16,
    left: 'calc(50% + 16px)',
    right: 'calc(50% - 16px)',
    height: 2,
    backgroundColor: COLORS.backgroundGray,
    marginTop: -1,
  },
  connectorCompleted: {
    backgroundColor: COLORS.primary,
  },
  statusCard: {
    alignItems: 'center',
    marginTop: 32,
    paddingHorizontal: 16,
  },
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  statusTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: 24,
  },
  helpButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  helpButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.primary,
    alignItems: 'center',
  },
  helpButtonText: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: '600',
  },
  cancelButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  cancelButtonText: {
    color: COLORS.textLight,
    fontSize: 14,
    marginLeft: 4,
  },
});

import { TouchableOpacity } from 'react-native';
