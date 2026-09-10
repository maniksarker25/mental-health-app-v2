import React from 'react';
import { useWindowDimensions } from 'react-native';
import RenderHTML from 'react-native-render-html';
import { ScreenWrapper } from '@/components/ui/layouts/ScreenWrapper';
import { AppHeader } from '@/components/ui/shared/AppHeader';
import { AppCard } from '@/components/ui/shared/AppCard';

const staticPrivacyHtml = `
<p><span style="white-space:pre-wrap; color: #18231F; font-size: 18px; font-weight: 600;">Privacy Policy &amp; Zero Retention</span></p>
<p><span style="color: #6B7A75; font-size: 12px;">Last Updated: 14 March 2026</span></p>
<br/>

<p><span style="white-space:pre-wrap; color: #4A5550; font-size: 14px; line-height: 22px;">At Mental Health Anonymous, we prioritize your confidentiality and privacy above all else. This Privacy Policy describes how information is handled when you use our application.</span></p>
<br/>

<p><span style="color: #18231F; font-size: 16px; font-weight: 600;">1. Zero Retention Commitment</span></p>
<p><span style="color: #4A5550; font-size: 14px; line-height: 22px;">We do not collect, store, or sell any personal data on remote servers. We operate under a strict zero-retention policy, meaning no sender identities, recipient phone numbers, or email addresses are ever stored in our databases.</span></p>
<br/>

<p><span style="color: #18231F; font-size: 16px; font-weight: 600;">2. How Anonymous Delivery Works</span></p>
<p><span style="color: #4A5550; font-size: 14px; line-height: 22px;">When you send an educational packet to a recipient, the contact information is processed purely in-memory solely for the instant dispatch of the resource. Immediately following dispatch, the recipient contact details are permanently purged.</span></p>
<br/>

<p><span style="color: #18231F; font-size: 16px; font-weight: 600;">3. On-Device Local History</span></p>
<p><span style="color: #4A5550; font-size: 14px; line-height: 22px;">Any delivery records or timestamps you see in your app's History tab are stored exclusively on your local device via local storage. You can permanently wipe this data at any time from the Settings screen.</span></p>
<br/>

<p><span style="color: #18231F; font-size: 16px; font-weight: 600;">4. Analytics &amp; Tracking</span></p>
<p><span style="color: #4A5550; font-size: 14px; line-height: 22px;">We do not use tracking cookies, advertising IDs, or cross-app user tracking mechanisms.</span></p>
<br/>

<p><span style="color: #18231F; font-size: 16px; font-weight: 600;">5. Contact Information</span></p>
<p><span style="color: #4A5550; font-size: 14px; line-height: 22px;">If you have any questions or concerns regarding our privacy practices, you can reach out via the support section in settings.</span></p>
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
