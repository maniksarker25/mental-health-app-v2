import React from 'react';
import { useWindowDimensions } from 'react-native';
import RenderHTML from 'react-native-render-html';
import { ScreenWrapper } from '@/components/ui/layouts/ScreenWrapper';
import { AppHeader } from '@/components/ui/shared/AppHeader';
import { AppCard } from '@/components/ui/shared/AppCard';

const staticTermsHtml = `
<p><span style="white-space:pre-wrap; color: #18231F; font-size: 18px; font-weight: 600;">Terms &amp; Conditions</span></p>
<p><span style="color: #6B7A75; font-size: 12px;">Last Updated: 14 March 2026</span></p>
<br/>

<p><span style="white-space:pre-wrap; color: #4A5550; font-size: 14px; line-height: 22px;">By accessing or using Mental Health Anonymous, you agree to comply with and be bound by these Terms &amp; Conditions.</span></p>
<br/>

<p><span style="color: #18231F; font-size: 16px; font-weight: 600;">1. Educational Purpose Only</span></p>
<p><span style="color: #4A5550; font-size: 14px; line-height: 22px;">All resources, toolkits, and information shared through this app are strictly for educational and awareness purposes. They do not constitute medical, psychiatric, or psychological diagnosis, advice, or treatment.</span></p>
<br/>

<p><span style="color: #18231F; font-size: 16px; font-weight: 600;">2. Emergency &amp; Crisis Disclaimer</span></p>
<p><span style="color: #4A5550; font-size: 14px; line-height: 22px;">This application is not a crisis response hotline. If you or someone you know is in immediate physical danger, experiencing suicidal thoughts, or in severe distress, please call your local emergency services (911) or contact a suicide &amp; crisis lifeline (988) immediately.</span></p>
<br/>

<p><span style="color: #18231F; font-size: 16px; font-weight: 600;">3. Acceptable Use Policy</span></p>
<p><span style="color: #4A5550; font-size: 14px; line-height: 22px;">You agree to use this service respectfully. You may not use the anonymous dispatch features to harass, spam, threaten, or send fraudulent communications to any individual.</span></p>
<br/>

<p><span style="color: #18231F; font-size: 16px; font-weight: 600;">4. Intellectual Property</span></p>
<p><span style="color: #4A5550; font-size: 14px; line-height: 22px;">All educational materials, designs, and content within the platform are protected by copyright and intellectual property laws and may not be reproduced without prior permission.</span></p>
<br/>

<p><span style="color: #18231F; font-size: 16px; font-weight: 600;">5. Limitation of Liability</span></p>
<p><span style="color: #4A5550; font-size: 14px; line-height: 22px;">Mental Health Anonymous and its contributors are not liable for any actions, health outcomes, or decisions made based on the information provided in the educational packets.</span></p>
<br/>

<p><span style="color: #18231F; font-size: 16px; font-weight: 600;">6. Changes to Terms</span></p>
<p><span style="color: #4A5550; font-size: 14px; line-height: 22px;">We may update these Terms from time to time. Continued use of the application after updates indicates acceptance of the revised Terms.</span></p>
`;

export default function TermsScreen() {
    const { width } = useWindowDimensions();
    const htmlContent = staticTermsHtml;

    return (
        <ScreenWrapper header={<AppHeader title="Terms & Conditions" />}>
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
