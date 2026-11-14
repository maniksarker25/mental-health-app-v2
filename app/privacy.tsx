import React from 'react';
import { useWindowDimensions } from 'react-native';
import RenderHTML from 'react-native-render-html';
import { ScreenWrapper } from '@/components/ui/layouts/ScreenWrapper';
import { AppHeader } from '@/components/ui/shared/AppHeader';
import { AppCard } from '@/components/ui/shared/AppCard';

const staticPrivacyHtml = `
<p><span style="white-space:pre-wrap; color: #18231F; font-size: 18px; font-weight: 600;">Privacy Policy</span></p>
<p><span style="color: #6B7A75; font-size: 12px;">Last Updated: 14 November 2026</span></p>
<br/>

<p><span style="white-space:pre-wrap; color: #4A5550; font-size: 14px; line-height: 22px;">This policy explains what information is handled when you use Mental Health Anonymous. Your sender identity is not included in the message delivered to a recipient, but the service processes dispatches through an account.</span></p>
<br/>

<p><span style="color: #18231F; font-size: 16px; font-weight: 600;">1. Account and Dispatch Information</span></p>
<p><span style="color: #4A5550; font-size: 14px; line-height: 22px;">When you create an account or sign in, account information is processed by our service. When you send a message, the service stores dispatch details, including the sender account, recipient contact details, selected topic and resources, optional note, and delivery status. This information is used to process and manage the dispatch.</span></p>
<br/>

<p><span style="color: #18231F; font-size: 16px; font-weight: 600;">2. Message Delivery</span></p>
<p><span style="color: #4A5550; font-size: 14px; line-height: 22px;">The recipient does not see your account identity in the message. Email and SMS delivery is handled by third-party delivery providers, which process the information needed to deliver it under their own privacy policies. A provider accepting a message does not guarantee final delivery.</span></p>
<br/>

<p><span style="color: #18231F; font-size: 16px; font-weight: 600;">3. Storage and History</span></p>
<p><span style="color: #4A5550; font-size: 14px; line-height: 22px;">Dispatch records are stored by the service and a masked copy may also appear in your app's local history. Clearing local history removes the local copy; it does not delete the service's dispatch record.</span></p>
<br/>

<p><span style="color: #18231F; font-size: 16px; font-weight: 600;">4. Privacy Questions</span></p>
<p><span style="color: #4A5550; font-size: 14px; line-height: 22px;">For questions about information handled by the service, contact support@mentalhealthanonymous.org.</span></p>
<br/>

`;

export default function PrivacyScreen() {
    const { width } = useWindowDimensions();

    const htmlContent = staticPrivacyHtml;

    return (
        <ScreenWrapper header={<AppHeader title="Privacy Policy" />}>
            <AppCard>
                <RenderHTML
                    contentWidth={width - 80}
                    source={{ html: htmlContent }}
                    baseStyle={{
                        color: '#4A5550',
                        fontSize: 14,
                        lineHeight: 22,
                    }}
                    enableCSSInlineProcessing={true}
                />
            </AppCard>
        </ScreenWrapper>
    );
}
